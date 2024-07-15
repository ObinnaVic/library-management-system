const mongoose = require("mongoose");
const Config = require("./config/config.js");
const process = require("process");

async function connectToDatabase() {
    try {
        await mongoose.connect(Config.MONGODB_URL);
        console.log("Database Connection Successful");
    } catch (error) {
        console.log("Database Connection Failed");
        process.exit(1);
    }
}

async function disconnectDatabase() {
    await mongoose.disconnect();
}

module.exports = {
    connectToDatabase,
    disconnectDatabase
}
