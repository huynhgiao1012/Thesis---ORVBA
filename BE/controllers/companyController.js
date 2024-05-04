const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Company = require("../models/company");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES } = require("../constant");
// _id.valueOf() --> lấy id từ object id
exports.createCompany = catchAsync(async (req, res) => {
  const { name, email, phone, openTime, closeTime, long, lat, address } =
    req.body;
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
    role: ROLES.COMPANY,
  });
  const company = await Company.create({
    accountId: account.id,
    openTime,
    closeTime,
    long,
    lat,
    address,
  });
  await EmailService.sendMail(
    process.env.EMAIL,
    `${email}`,
    "REGISTER COMPANY SUCCESS",
    `Your passwors: ${password}`
  );
  res.status(200).json({
    success: true,
    message: "Successfull",
    account,
    company,
  });
});
exports.deleteCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const account = await Account.findById(id);
  const company = await Company.findOne({ accountId: id });
  if (!account || !company) {
    throw new ApiError(400, "This company is not available");
  }
  await account.remove();
  await company.remove();
  res.status(200).json({
    success: true,
    data: account,
  });
});
exports.updateCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, phone, openTime, closeTime, long, lat, address } = req.body;
  const account = await Account.findByIdAndUpdate(
    id,
    { name, phone },
    { new: true }
  );
  const company = await Company.findOneAndUpdate(
    { accountId: id },
    { openTime, closeTime, long, lat, address },
    { new: true }
  );
  if (!account || !company) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    accountInfo: account,
    companyInfo: company,
  });
});
exports.getAllCompany = catchAsync(async (req, res) => {
  const data = await Account.find({ role: ROLES.COMPANY });
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCorCompany = catchAsync(async (req, res) => {
  const data = await Company.find({});
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getSpecificCorCompany = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await Company.findOne({ accountId: id });
  if (!data) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getCompany = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Account.findById(id);
  const companyDetail = await Company.findOne({ accountId: id });
  if (!data || !companyDetail) {
    throw new ApiError(400, "This company is not available");
  }
  res.status(200).json({
    success: true,
    data,
    companyDetail,
  });
});

// exports.getAllTrip = catchAsync(async (req, res) => {
//   data = await Trip.find({});
//   if (data.length === 0) {
//     throw new ApiError(400, "There is no available trip");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.deleteTrip = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const trip = await Trip.findById(id);
//   const ticket = await Ticket.find({ tripID: id });
//   if (!trip) {
//     throw new ApiError(400, "This trip is not available");
//   }
//   await trip.remove();
//   await Ticket.deleteMany({ tripID: id });
//   await Seat.deleteMany({ tripID: id });
//   for (i = 0; i < ticket.length; i++) {
//     await Payment.deleteOne({ ticketID: ticket[i]._id });
//   }
//   res.status(200).json({
//     success: true,
//     data: trip,
//   });
// });
// exports.updateTrip = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { source, destination, Date, StartTime, EndTime, price } = req.body;
//   const trip = await Trip.findByIdAndUpdate(
//     id,
//     { source, destination, Date, StartTime, EndTime, price },
//     { new: true }
//   );
//   res.status(200).json({ success: true, data: trip });
// });
// exports.getTrip = catchAsync(async (req, res) => {
//   const { source, destination } = req.body;
//   var data;
//   if (!source && !destination) {
//     data = await Trip.find({});
//   } else if (source && !destination) {
//     data = await Trip.find({ source });
//   } else {
//     data = await Trip.find({ source, destination });
//   }
//   if (data.length === 0) {
//     throw new ApiError(400, "There is no available trip");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getAllTrip = catchAsync(async (req, res) => {
//   data = await Trip.find({});
//   if (data.length === 0) {
//     throw new ApiError(400, "There is no available trip");
//   }
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getSeat = catchAsync(async (req, res) => {
//   const { tripID } = req.body;
//   if (!tripID) {
//     throw new ApiError(400, "There is no available trip");
//   }
//   data = await Seat.find({ tripID: tripID });
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getTripById = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const data = await Trip.findById(id);
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });
// exports.getSource = catchAsync(async (req, res) => {
//   const data = await Trip.find();
//   let newData = [];
//   data.forEach((element) => {
//     if (!newData.includes(element.source)) {
//       newData.push(element.source);
//     }
//   });
//   res.status(200).json({
//     success: true,
//     newData,
//   });
// });
// exports.getDestination = catchAsync(async (req, res) => {
//   const data = await Trip.find();
//   let newData = [];
//   data.forEach((element) => {
//     if (!newData.includes(element.destination)) {
//       newData.push(element.destination);
//     }
//   });
//   res.status(200).json({
//     success: true,
//     newData,
//   });
// });
