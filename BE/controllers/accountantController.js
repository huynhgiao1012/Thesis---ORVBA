const catchAsync = require("../middleware/async");
const Account = require("../models/account");
const Mechanic = require("../models/mechanic");
const Accountant = require("../models/accountant");
const Manager = require("../models/manager");
const ApiError = require("../utils/ApiError");
var generator = require("generate-password");
const EmailService = require("../utils/EmailService");
const { ROLES, FORM_STATUS } = require("../constant");
const OrderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const Garage = require("../models/garage");
const CarSpares = require("../models/carSpares");
const SubCarSpares = require("../models/subCarSpares");
const Notification = require("../models/notification");
const { io } = require("socket.io-client");
const feedback = require("../models/feedback");
const customer = require("../models/customer");

exports.updateDone = catchAsync(async (req, res) => {
  const id = req.params;
  const accountantId = req.user;
  const orderForm = await OrderForm.findByIdAndUpdate(
    id.id,
    {
      accountantId: accountantId.id,
      isPaid: true,
      status: FORM_STATUS.DONE,
    },
    { new: true }
  );
  if (orderForm) {
    const point = await customer.findOne({ accountId: orderForm.customerId });
    const point2 = await Mechanic.findOne({ accountId: orderForm.mechanicId });
    await Notification.create({
      from: accountantId.id,
      to: orderForm.customerId,
      text: `FORM'S STATUS - Your booking has been done ! Thank you for using our services ! `,
    });
    await customer.findOneAndUpdate({
      accountId: orderForm.customerId,
      point: point.point + 10,
    });
    await Mechanic.findOneAndUpdate({
      accountId: orderForm.mechanicId,
      point: point2.point + 10,
    });
    const socketIo = io("https://dao-applicationservice.onrender.com");
    socketIo.emit("sendNotification", {
      senderName: accountantId.id,
      receiverName: orderForm.customerId,
      text: `FORM'S STATUS - Your booking has been done ! Thank you for using our services ! `,
    });
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

exports.getUnPaidForms = catchAsync(async (req, res) => {
  const accountId = req.user;
  const accountant = await Accountant.findOne({ accountId: accountId.id });
  const orderForm = await OrderForm.find({
    garageId: accountant.garageId,
    isPaid: false,
    status: FORM_STATUS.HOLDING,
  }).populate("customerId");
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
exports.addCarSpares = catchAsync(async (req, res) => {
  const accountId = req.user;
  const { brand, img } = req.body;
  const accountant = await Accountant.findOne({ accountId: accountId.id });
  const carSpares = await CarSpares.create({
    garageId: accountant.garageId,
    accountantId: accountId.id,
    brand,
    img,
  });
  if (carSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: carSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.addSubCarSpare = catchAsync(async (req, res) => {
  const { data } = req.body;
  const removeItems = await SubCarSpares.find({
    carSpareId: data[0].carSpareId,
  });
  removeItems.map(async (val) => {
    await val.remove();
  });
  const carSpares = await SubCarSpares.insertMany([...data], {
    ordered: false,
  });
  if (carSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: carSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.updateCarSpares = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { brand, img } = req.body;
  const carSpares = await CarSpares.findOneAndUpdate(
    id,
    {
      brand,
      img,
    },
    { new: true }
  );
  if (carSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: carSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
exports.getAllCarSpares = catchAsync(async (req, res) => {
  const accountId = req.user;
  const accountant = await Accountant.findOne({ accountId: accountId.id });
  const carSpares = await CarSpares.find({
    garageId: accountant.garageId,
  });
  if (carSpares) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      carSpares: carSpares,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed",
    });
  }
});
