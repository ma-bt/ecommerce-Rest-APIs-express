import CustomErrorHandler from "../services/CustomErrorHandler";

const auth = (res, req, next) => {

  let authHeader = req.headers.authorization
  console.log(authHeader,"AuthHeader");

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(' ')[1];
  console.log(token)
};
export default auth;
