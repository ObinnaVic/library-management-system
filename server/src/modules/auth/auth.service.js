const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError.js");
const userService = require("../user/user.service.js");

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);

    if (user.statusCode == 404 || !(await user.isPasswordMatch(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
