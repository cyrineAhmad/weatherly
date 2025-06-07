const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
