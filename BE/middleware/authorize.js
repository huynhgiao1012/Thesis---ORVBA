const ApiError = require("../utils/ApiError");
exports.authorize =
  (...roles) =>
  (req, res, next) => {
    // roles: tham số truyền vào authorize bên bookRoutes
    const role = req.user.role;
    if (!role || !roles.includes(role)) {
      throw new ApiError(403, "Don't have permission");
    }
    next();
  };
