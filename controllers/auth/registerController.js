import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";
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
    } catch (err) { //If an error occurs during the execution of the User.exists method (for example, a database error or any other unexpected error), the catch block catches the error.
      return next(err); // takes error from the default error handler
    }

    /* prepare model */
    /* store in database */
    /* generate jwt token */
    /* send response */

    res.json({ msg: "Hello world" });
  },
};
export default registerController;
