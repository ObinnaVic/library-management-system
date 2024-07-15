//This is a module to validate the entries for creating, getting, querying, updating and deleting users
const JOI = require("joi");
const validate = require("./custom.validation.js");

const createUser = {
  body: JOI.object().keys({
    email: JOI.string().required().email(),
    password: JOI.string().required().custom(validate.password),
    firstName: JOI.string().required(),
    lastName: JOI.string().required(),
    role: JOI.string().required(),
  }),
};

const queryUsers = {
  query: JOI.object().keys({
    email: JOI.string(),
    firstName: JOI.string(),
    lastName: JOI.string(),
    limit: JOI.number().integer(),
  }),
};

const getUser = {
  params: JOI.object().keys({
    userID: JOI.string().custom(validate.objectId),
  }),
};

const updateUser = {
  params: JOI.object().keys({
    userID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object()
    .keys({
      email: JOI.string().email(),
      firstName: JOI.string(),
      lastName: JOI.string(),
      password: JOI.string().custom(validate.password),
    })
    .min(1),
};

const deleteUser = {
  params: JOI.object().keys({
    userID: JOI.string().custom(validate.objectId),
  }),
};

const assignRole = {
  params: JOI.object().keys({
    userID: JOI.string().custom(validate.objectId),
  }),
};

module.exports = {
  createUser,
  queryUsers,
  getUser,
  updateUser,
  deleteUser,
  assignRole
}
