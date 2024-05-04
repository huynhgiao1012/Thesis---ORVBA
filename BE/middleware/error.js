const catchError = (err, req, res, next) => {
  // xem lỗi
  //console.log(JSON.stringify(err, null, 2));

  // lỗi liên quan đến validation mongoose
  if (err.name === "ValidationError") {
    const errors = err.errors;
    const keys = Object.keys(errors); // keys là 1 mảng có ['title']
    const errorObj = {}; // tạo obj rỗng
    keys.map((key) => {
      errorObj[key] = errors[key].message;
      if (errors[key].kind === "enum") {
        errorObj[key] = "Invalid enum";
      }
    });
    err.statusCode = 400;
    err.message = errorObj;
  } // lỗi bad object id
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "Invalid id";
  }
  if (err.code === 11000) {
    err.statusCode = 400;
    const errorObj = {};
    errorObj["duplicate"] = `The ${
      Object.keys(err.keyPattern)[0]
    } has been used`;
    err.message = errorObj;
  } // format in ra lỗi : dạng object
  res.status(err.statusCode || 500).json({
    // 500 là lỗi liên quan đến server
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Error", // lỗi ko xác định được => in ra internal error
  });
};
module.exports = catchError;
