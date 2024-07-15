const ApiError = require("../../utils/ApiError.js");
const { Record } = require("./records.model.js");



const createRecord = async (recordDetails) => {
    const { totalMembers, totalBooks, totalBorrowings, totalAmountFromFees } = recordDetails;

    const newRecord = new Record({
        totalMembers,
        totalBooks,
        totalBorrowings,
        totalAmountFromFees
    });
    
    await newRecord.save();

    return newRecord;
};

const getRecords = async () => {
    const records = await Record.find();

    return records;
}


const updateRecords = async(recordID, recordDetails) => {
    const updated = await Record.findOneAndUpdate({ _id: recordID }, recordDetails, { upsert: true });
    
    if (!updated) {
        throw new ApiError(400, "Record Update failed");
    }

    return updated;
}

module.exports = {
    createRecord,
    getRecords,
    updateRecords
}