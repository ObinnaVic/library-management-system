const httpStatus = require("http-status");
const recordsService = require("./records.service.js");

const httpCreateRecord = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Librarian") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Not Authorized" });
    }

    const record = await recordsService.createRecord(req.body);

    res.status(httpStatus.ACCEPTED).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const testCreateRecord = async (req, res) => {
  try {
    const record = await recordsService.createRecord(req.body);

    res.status(httpStatus.ACCEPTED).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpGetRecords = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Librarian") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Not Authorized" });
    }

    const record = await recordsService.getRecords();

    res.status(httpStatus.OK).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const testGetRecords = async (req, res) => {
  try {
    const record = await recordsService.getRecords();

    res.status(httpStatus.OK).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const httpUpdateRecords = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Librarian") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Not Authorized" });
    }

    const record = await recordsService.updateRecords(req.params.id, req.body);

    res.status(httpStatus.ACCEPTED).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

const testUpdateRecords = async (req, res) => {
  try {
    const record = await recordsService.updateRecords(req.params.id, req.body);

    res.status(httpStatus.ACCEPTED).json(record);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error);
  }
};

module.exports = {
  httpCreateRecord,
  httpGetRecords,
  httpUpdateRecords,
  testCreateRecord,
  testGetRecords,
  testUpdateRecords,
};
