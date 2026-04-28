const jwt = require("jsonwebtoken");

const private = (req, res, next) => {
  let token =
    req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "token_required" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "token_not_valid" });
  }
};

module.exports = private;