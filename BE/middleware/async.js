const catchAsync = (fn) => (req, res, next) => {
  // function mdw này trả về 1 function khác là (req, res, next)
  // dùng promise để định nghĩa
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  // next(err) có nghĩa là tất cả các lỗi sẽ được đẩy vào next(err)
  // => sau đó đẩy qua mdw tiếp theo chính là mdw catchError
};
module.exports = catchAsync;
