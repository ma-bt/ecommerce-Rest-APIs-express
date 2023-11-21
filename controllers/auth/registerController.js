import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";

const registerController = {
  async register(req, res, next) {
    /*  register logic */

    /* validate the request */
    const registerSchema /* creating schema */ = Joi.object({
      name: Joi.string().min(3).max(30).required(), //validating for name
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"), // ref = reference of password
    });
    const { error } = registerSchema.validate(req.body); //for error validaing the request body

    if (error) {
      return next(error); //middleware will catch this error
    }

    /* authorize the request */
    /* check if user is in the database already */

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExists("This email is already taken")
        );
      }
    } catch (err) {
      //If an error occurs during the execution of the User.exists method (for example, a database error or any other unexpected error), the catch block catches the error.
      return next(err); // takes error from the default error handler
    }

    /*  hash password */
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    /* prepare model */

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    /* store in database */
    let access_token;

    try {
      const result = await user.save();

      /* generate jwt token */
      access_token = JwtService.sign(
        {
          _id: result._id,
          role: result.role,
        } //payload
      );
    } catch (err) {
      return next(err);
    }
    /* send response */

    res.json({ access_token: access_token });
  },
};
export default registerController;
