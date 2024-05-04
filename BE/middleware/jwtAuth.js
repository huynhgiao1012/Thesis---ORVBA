const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.jwtAuth = (req, res, next) => {
  const headerToken = req.headers["authorization"];
  if (!headerToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const token = headerToken.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    // token expired
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token is exprired");
    }
    throw new ApiError(401, "Unauthorized");
  }
};
