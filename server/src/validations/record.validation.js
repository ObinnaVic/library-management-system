const JOI = require("joi");
const validate = require("./custom.validation.js");

const createRecord = {
  body: JOI.object().keys({
    totalMembers: JOI.string().required(),
    totalBooks: JOI.string().required(),
    totalBorrowings: JOI.string().required(),
    totalAmountFromFees: JOI.string().required(),
  }),
};

const updateRecord = {
  param: JOI.object().keys({
    recordID: JOI.string().required().custom(validate.objectId),
  }),
  body: JOI.object().keys({
    totalMembers: JOI.string(),
    totalBooks: JOI.string(),
    totalBorrowings: JOI.string(),
    totalAmountFromFees: JOI.string(),
  }),
};

module.exports = {
  createRecord,
  updateRecord
}
