const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

//checkes whether the user has sent right token or not

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.starts.with("Bearer")) {
    return res.status(403).json({});
  }

  const token = authHeader.slpit(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
