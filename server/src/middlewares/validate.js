const JOI = require("joi")
const pick = require("../utils/pick.js");
const ApiError = require("../utils/ApiError.js");
const httpStatus = require("http-status");

const validate =
  (schema) =>
  (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = JOI.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

module.exports = validate;