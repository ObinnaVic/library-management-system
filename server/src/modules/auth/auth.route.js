const express = require("express");
const validate = require("../../middlewares/validate.js");
const validator = require("../../validations/auth.validation.js");
const authController = require("./auth.controller.js");


const AuthRoute = express.Router();

AuthRoute.route("/register").post(validate(validator.register), authController.httpRegister);
AuthRoute.route("/login").post(validate(validator.login), authController.httpLogin);
AuthRoute.route("/logout").get(authController.httpLogout);

module.exports = AuthRoute;