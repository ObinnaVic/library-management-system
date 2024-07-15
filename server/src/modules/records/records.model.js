const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const recordSchema = new Schema({
    totalMembers: {
        type: Number,
        required: true
    },

    totalBooks: {
        type: Number,
        required: true
    },

    totalBorrowings: {
        type: Number,
    },

    totalAmountFromFees: {
        type: Number
    },

})

const Record = mongoose.model("Records", recordSchema);

module.exports = Record;