import Joi from "joi";
import { RefreshToken, User } from "../../models";
import bcrypt from "bcrypt";

import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import {  REFRESH_TOKEN_SECRET } from "../../config";

const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const user =  await User.findOne({ email: req.body.email });
      console.log(user,"User");
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      //campare the password

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      //token generate
      const access_token = JwtService.sign(
        {
          _id: user._id,
          role: user.role,
        } //payload
      );

      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_TOKEN_SECRET
      );

      await RefreshToken.create({token: refresh_token})
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
};

export default loginController;
