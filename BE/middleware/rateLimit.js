const rateLimit = require("express-rate-limit");
exports.limiter = (maxrequests, minutes) =>
  rateLimit({
    windowMs: minutes * 60 * 1000, // 15 minutes
    max: maxrequests, // limit each IP to 100 requests per windowMs
    message: "Too many request ! Please wait for a second",
    skipSuccessfulRequests: true,
  });
