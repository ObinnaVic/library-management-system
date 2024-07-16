const express = require("express");
const verifyToken = require("../../middlewares/verifyToken.js");
const recordsController = require("./records.controller.js");
const validate = require("../../middlewares/validate.js");
const {
  createRecord,
  updateRecord,
} = require("../../validations/record.validation.js");

const RecordRoute = express.Router();


//test Routes
RecordRoute.route("/test")
  .post(validate(createRecord), recordsController.testCreateRecord)
  .get(recordsController.testGetRecords)
  
  RecordRoute.route("/test/:recordID").put(
    validate(updateRecord),
    recordsController.testUpdateRecords
  );



RecordRoute.route("/")
  .post(validate(createRecord), verifyToken, recordsController.httpCreateRecord)
  .get(verifyToken, recordsController.httpGetRecords)

RecordRoute.route("/:recordID").put(
  validate(updateRecord),
  verifyToken,
  recordsController.httpUpdateRecords
);

module.exports = RecordRoute;
