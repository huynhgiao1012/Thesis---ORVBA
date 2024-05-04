const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Garage = require("../models/garage");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
const service = require("../models/service");
// _id.valueOf() --> lấy id từ object id

// admin adds garage's information to system
exports.createGarage = catchAsync(async (req, res) => {
  const {
    name,
    email,
    phone,
    longitude,
    latitude,
    address,
    description,
    openTime,
    closeTime,
    transferInfo,
  } = req.body;
  const garage = await Garage.create({
    name,
    email,
    phone,
    longitude,
    latitude,
    address,
    description,
    openTime,
    closeTime,
    transferInfo,
    img: "None",
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    garage,
  });
});
// exports.deleteGarage = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const account = await Garage.findById(id);
//   const company = await Company.findOne({ accountId: id });
//   if (!account || !company) {
//     throw new ApiError(400, "This company is not available");
//   }
//   await account.remove();
//   await company.remove();
//   res.status(200).json({
//     success: true,
//     data: account,
//   });
// });
exports.updateGarage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    openTime,
    closeTime,
    longitude,
    latitude,
    address,
    description,
    transferInfo,
  } = req.body;
  const gara = await Garage.findByIdAndUpdate(
    id,
    {
      name: name,
      email: email,
      phone: phone,
      openTime: openTime,
      closeTime: closeTime,
      longitude: longitude,
      latitude: latitude,
      address: address,
      description: description,
      transferInfo: transferInfo,
    },
    { new: true }
  );
  if (!gara) {
    throw new ApiError(400, "This garage is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    garage: gara,
  });
});

// admin get all garages
exports.getAllGarage = catchAsync(async (req, res) => {
  const data = await Garage.find({});
  if (!data) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// exports.getCorCompany = catchAsync(async (req, res) => {
//   const data = await Company.find({});
//   if (!data) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getSpecificCorCompany = catchAsync(async (req, res) => {
//   const id = req.user.id;
//   const data = await Company.findOne({ accountId: id });
//   if (!data) {
//     throw new ApiError(400, "This company is not available");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
exports.getGarageDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Garage.findById(id);
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.createManagerAccount = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const garageId = req.params;
  var password = generator.generateMultiple(1, {
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  })[0];
  const account = await Account.create({
    name,
    email,
    phone,
    password,
    role: ROLES.MANAGER,
    isActive: true,
  });
  const manager = await Manager.create({
    accountId: account._id,
    garageId: garageId.id,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "YOUR ACCOUNT IS ACTIVE",
    `Your passwors: ${password}`
  );
  res.status(200).json({
    success: true,
    message: "Successfull",
    account: account,
    manager: manager,
  });
});
exports.getSpecificCorGarage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Garage.findById(id);
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCorGarage = catchAsync(async (req, res) => {
  const data = await Garage.find({});
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Manager.find({
    garageId: id,
  }).populate("accountId", "name email phone img _id");
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
