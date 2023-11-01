const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, username) => {
  return jwt.sign(
    { _id, username},
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" }
  );
};

module.exports = generateAuthToken;