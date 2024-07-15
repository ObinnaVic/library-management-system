const httpStatus = require("http-status");
const { JWT_SECRET } = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");


//function to verify jwt token
const verifyToken = async (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) res.status(httpStatus.BAD_REQUEST).json({ error: "User not Authenticated" });
    
    const payload = jsonwebtoken.verify(accessToken, JWT_SECRET);

    if (payload) {
        req.user = payload; //set req.validUser to details of particular user
        return next();
    }

}

module.exports = verifyToken;