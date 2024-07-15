const express = require("express");
const userController = require("./user.controller.js");
const verifyToken = require("../../middlewares/verifyToken.js");
const validate = require("../../middlewares/validate.js");
const {
  assignRole,
  queryUsers,
} = require("../../validations/user.validation.js");

const UserRoutes = express.Router();

//Query Users (user?filter="")
UserRoutes.route("/users").get(validate(queryUsers), verifyToken, userController.httpQueryUsers);

//Assign user roles
UserRoutes.route("/user/role/:userID").post(validate(assignRole),
  verifyToken,
  userController.httpAssignRole
);


module.exports = UserRoutes;