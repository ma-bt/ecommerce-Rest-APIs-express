class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message= "Username or password is wrong ") {
    return new CustomErrorHandler(401, message)
  }
}

export default CustomErrorHandler;
