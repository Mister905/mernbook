const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  // Get token from request header
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized Request: Missing Token" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwt_secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: "Unauthorized Request: Invalid Token" });
  }
};
