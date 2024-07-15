const userService = require("../user/user.service.js");

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);

    if (!user || !(await user.isPasswordMatch(password))) {
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
