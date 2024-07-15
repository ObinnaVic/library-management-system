const dotenv = require("dotenv");

const Config = dotenv.config();

const APP_PORT = process.env.PORT || 8001;
const JWT_SECRET = process.env.JWT_SECRET; 
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
    APP_PORT,
    JWT_SECRET,
    MONGODB_URL,
    Config
};

