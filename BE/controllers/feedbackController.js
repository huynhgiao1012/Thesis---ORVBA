const catchAsync = require("../middleware/async");
const Feedback = require("../models/feedback");
const OrderForm = require("../models/orderForm");
const Customer = require("../models/customer");
const ApiError = require("../utils/ApiError");

exports.createFeedback = catchAsync(async (req, res) => {
  const { customerId, garageId, formID, rating, review } = req.body;
  const feedback = await Feedback.create({
    customerId: customerId,
    garageId: garageId,
    formID: formID,
    rating: rating,
    review: review,
  });
  await OrderForm.findByIdAndUpdate(
    formID,
    { isFeedback: true },
    { new: true }
  );
  res.status(200).json({
    success: true,
    feedback,
  });
});
// exports.deleteFeedback = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const fb = await Feedback.findById(id);
//   if (!fb) {
//     throw new ApiError(400, "Feedback is not available");
//   }
//   await fb.remove();
//   res.status(200).json({
//     success: true,
//     message: "Delete successfully!",
//     data: fb,
//   });
// });
exports.getAllFeedback = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Feedback.find({ garageId: id }).populate(
    "customerId",
    "name phone _id"
  );
  if (!data) {
    throw new ApiError(400, "Feedback is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getAllFeedbackByCus = catchAsync(async (req, res) => {
  const { id } = req.user;
  const data = await Feedback.find({ customerId: id })
    .populate("formID")
    .populate("garageId", "name phone _id");
  if (!data) {
    throw new ApiError(400, "Feedback is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
