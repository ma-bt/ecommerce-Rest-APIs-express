import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization; //Retrieves the authorization header from the incoming request i.e bearer plus token

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized()); //stops further execution by not calling next().
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const { _id, role } = await JwtService.verify(token);// Upon successful verification, it extracts the _id and role from the token payload.
    const user = {
      _id,
      role,
    };
    req.user = user;

    next(); //for middleware
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized());
  }
};
export default auth;
