const { FORM_STATUS, GROUP } = require("../constant");
const catchAsync = require("../middleware/async");
const orderForm = require("../models/orderForm");
const ApiError = require("../utils/ApiError");
const payment = require("../models/payment");
const customer = require("../models/customer");
const stripe = require("stripe")(
  "sk_test_51NKv7XIatF4AkN7lpqCvr5HT3Cg3mUK6pnjQryIDAXO6ffg5DiSx4dHjX2rhUmpDKqLh7llrpHUYEVmnq6tLJlKF00F3N2HMc8"
);
exports.deleteForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findById(id);
  if (!noti) {
    throw new ApiError(400, "Notification is not available");
  }
  await noti.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
    data: noti,
  });
});
exports.updateProcessForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findByIdAndUpdate(id, {
    status: FORM_STATUS.PROCESS,
  });
  if (!noti) {
    throw new ApiError(400, "Form is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.updateDoneForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await orderForm.findByIdAndUpdate(id, {
    status: FORM_STATUS.DONE,
  });
  if (!noti) {
    throw new ApiError(400, "Form is not available");
  }
  await payment.create({ formId: id });
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.getAllFormByCustomer = catchAsync(async (req, res) => {
  const id = req.user.id;
  const Customer = await customer.findOne({ accountId: id });
  const data = await orderForm
    .find({ customerId: id })
    .populate("garageId", "name email phone _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllFormByGarage = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await orderForm
    .find({ garageId: id })
    .populate("customerId", "name email phone _id")
    .populate("serviceId", "type price description _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllForm = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await orderForm
    .find({ garageId: id })
    .populate("customerId", "name email phone _id")
    .populate("serviceId", "type price description _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllFormAdmin = catchAsync(async (req, res) => {
  const data = await orderForm
    .find()
    .populate("customerId", "name email phone _id")
    .populate("serviceId", "type price description _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getFormDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await orderForm
    .findById(id)
    .populate("customerId", "name email phone _id")
    .populate("mechanicId", "name email phone _id")
    .populate("garageId", "name email phone _id");
  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getFormNotFeed = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await orderForm
    .find({
      isFeedback: false,
      isPaid: true,
      customerId: id,
    })
    .populate("garageId", "name email phone _id")
    .populate("mechanicId", "name email phone _id");

  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getFormFeed = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await orderForm
    .find({
      isFeedback: true,
      isPaid: true,
      customerId: id,
    })
    .populate("garageId", "name email phone _id")
    .populate("mechanicId", "name email phone _id");

  if (!data) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.paymentIntent = catchAsync(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});
exports.payment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const paymentItem = await payment.findOneAndUpdate({
    formId: id,
    paymentStatus: true,
  });
  const data = await orderForm.findByIdAndUpdate(id, { isPaid: true });
  if (!data || !paymentItem) {
    throw new ApiError(400, "Form is unavailable");
  }
  res.status(200).json({
    success: true,
    paymentItem,
  });
});
