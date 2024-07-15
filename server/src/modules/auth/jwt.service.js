const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config.js");

const createToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, firstName: user.firstName, role: user.role },
    JWT_SECRET
  );

  return accessToken;
};

module.exports = createToken;
