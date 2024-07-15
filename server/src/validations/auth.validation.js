//This module is to validate entries for registering, logging in and logging out of users
const JOI = require("joi");
const validate = require("./custom.validation.js");

const register = {
  body: JOI.object().keys({
    email: JOI.string().required().email(),
    password: JOI.string().required().custom(validate.password),
    firstName: JOI.string().required(),
    lastName: JOI.string().required(),
    role: JOI.string().required(),
  }),
};

const login = {
  body: JOI.object().keys({
    email: JOI.string().required(),
    password: JOI.string().required(),
  }),
};


module.exports = {
  register,
  login,
};
