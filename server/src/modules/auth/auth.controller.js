const httpStatus = require("http-status");
const userService = require("../user/user.service.js");
const authService = require("./auth.service.js");
const createToken = require("./jwt.service.js");

const httpRegister = async (req, res) => {
  try {
    const user = req.body;

    const registerSuccess = await userService.createUser(user);

    res.status(httpStatus.CREATED).json(registerSuccess);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );

    const accessToken = createToken(user);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    res.status(httpStatus.ACCEPTED).json(user);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpLogout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(httpStatus.OK).json({ message: "Logout Successful" });
}

module.exports = {
  httpRegister,
  httpLogin,
  httpLogout
};
