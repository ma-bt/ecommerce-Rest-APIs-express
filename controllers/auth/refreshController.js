import Joi from "joi";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_TOKEN_SECRET } from "../../config";

const refreshController = {
  async refresh(req, res, next) {
    /* validation */
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    /* checking in database */
    let refreshtoken;

    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });

      console.log(refreshtoken);

      if (!refreshtoken) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      /* verifying the Refresh Token */
      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          REFRESH_TOKEN_SECRET
        );

        userId = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No User Found"));
      }

      const access_token = JwtService.sign(
        {
          _id: user._id,
          role: user.role,
        } //payload
      );
      console.log(access_token);

      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_TOKEN_SECRET
      );

      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(new Error("Something went wrong" + err.message));
    }
  },
};
export default refreshController;
