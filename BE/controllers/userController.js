const catchAsync = require("../middleware/async");
const User = require("../models/account");
const EmailService = require("../utils/EmailService");
const bcrypt = require("bcryptjs");
const { ROLES } = require("../constant");
const ApiError = require("../utils/ApiError");
// admin delete users' account
// exports.deleteUser = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   const customer = await Customer.findOne({ accountId: id });
//   if (!user) {
//     throw new ApiError(400, "This user is not available");
//   }
//   await user.remove();
//   if (customer) {
//     await customer.remove();
//   }
//   if (company) {
//     await company.remove();
//   }
//   res.status(200).json({
//     success: true,
//     message: "Delete successfully !",
//     data: user,
//   });
// });

// users can update their information
exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { name, phone, img } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name: name, phone: phone, img: img },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, "This user is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: user });
});
exports.setInActive = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { isActive: status },
    { new: true }
  );
  if (!user) {
    throw new ApiError(400, "This user is not available");
  }
  res
    .status(200)
    .json({ success: true, message: "Update successfully", data: user });
});
// admin gets all users
exports.getAllUser = catchAsync(async (req, res) => {
  const result = await User.find({});
  let data = [];
  result.map((val) => {
    if (val.role !== ROLES.ADMIN) {
      data.push(val);
    }
  });
  res.status(200).json({
    success: true,
    data,
  });
});
// admin gets account's information
exports.getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});

// each users get their information
exports.getUserDetails = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await User.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});

// user update their password after singing in
exports.updatePassword = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newPassword } = req.body;
  const existEmail = await User.findOne({ email: email });
  if (!existEmail) {
    throw new ApiError(400, "Email have no longer exists");
  }
  const isMatch = bcrypt.compareSync(oldPassword, existEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "Old password does not match");
  } else {
    existEmail.password = newPassword;
    existEmail.save();
  }
  res.json({
    success: true,
    message: "Change successfully !",
  });
});
