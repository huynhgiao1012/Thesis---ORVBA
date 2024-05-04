class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // là constructor của Error phía trên
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = ApiError;
