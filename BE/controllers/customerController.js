const { FORM_STATUS, GROUP } = require("../constant");
const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Customer = require("../models/customer");
const OrderForm = require("../models/orderForm");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
const { io } = require("socket.io-client");
const Notification = require("../models/notification");

// each users get their information
exports.getUserDetails = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await Account.findById(id);
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// customer can view customer's point
exports.getUserPoint = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await Customer.findOne({ accountId: id });
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// update point of user after using service
exports.updateCustomerPoint = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { point } = req.body;
  const Point = await Customer.findOne({ accountId: id });
  const data = await Customer.findOneAndUpdate(
    { accountId: id },
    { point: Number(point) + Number(Point.point) },
    { new: true }
  );
  if (!data) {
    throw new ApiError(400, "This user is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
// booking maintenance
exports.bookingMaintenance = catchAsync(async (req, res) => {
  const {
    customerName,
    phone,
    service,
    address,
    date,
    time,
    price,
    note,
    garageId,
  } = req.body;
  const accountId = req.user;
  const manager = await Manager.findOne({ garageId: garageId });
  const orderForm = await OrderForm.create({
    customerName,
    phone,
    service,
    address,
    date,
    time,
    customerId: accountId.id,
    garageId: garageId,
    imgAf: "None",
    imgBf: "None",
    automaker: "None",
    type: "maintenance",
    price,
    note,
    status: FORM_STATUS.AWAIT,
    carSpares: [],
  });
  const socketIo = io("https://dao-applicationservice.onrender.com");
  socketIo.emit("sendNotification", {
    senderName: accountId.id,
    receiverName: manager.accountId,
    text: `NEW MAINTENANCE BOOKING - ${customerName} has booked your service`,
  });
  console.log("sent sent");
  await Notification.create({
    from: accountId.id,
    to: manager.accountId,
    text: `NEW MAINTENANCE BOOKING - ${customerName} has booked your service`,
  });
  if (orderForm) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      orderForm: orderForm,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getAllFormTime = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const orderForm = await OrderForm.find({
    garageId: id,
    type: GROUP.MAINTENANCE,
    status: FORM_STATUS.BOOKED,
    date: date,
  });
  const time = orderForm.map((val) => {
    return val.time;
  });
  res.status(200).json({
    success: true,
    time,
  });
});
exports.getUnFeedForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    isFeedback: false,
    customerId: customer._id,
    status: FORM_STATUS.DONE,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});

exports.getAllForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    customerId: customer._id,
  }).populate("garageId", "name");
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
exports.getEmergencyForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    customerId: customer._id,
    type: GROUP.EMERGENCY,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
exports.getMaintainForm = catchAsync(async (req, res) => {
  const accountId = req.user;
  const customer = await Customer.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    customerId: customer._id,
    type: GROUP.MAINTENANCE,
  });
  if (!orderForm) {
    throw new ApiError(400, "Not available");
  }
  res.status(200).json({
    success: true,
    orderForm,
  });
});
