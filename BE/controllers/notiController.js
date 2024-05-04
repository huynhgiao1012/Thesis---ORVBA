const { NOTI_STATUS } = require("../constant");
const catchAsync = require("../middleware/async");
const notification = require("../models/notification");
const ApiError = require("../utils/ApiError");

exports.createNotification = catchAsync(async (req, res) => {
  const { from, to, text } = req.body;
  const noti = await notification.create({
    from: from,
    to: to,
    text: text,
  });
  res.status(200).json({
    success: true,
    noti,
  });
});
exports.deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await notification.findById(id);
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
exports.updateNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const noti = await notification.findByIdAndUpdate(
    id,
    {
      status: NOTI_STATUS.READ,
    },
    { new: true }
  );
  console.log(noti);
  if (!noti) {
    throw new ApiError(400, "Notification is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
  });
});
exports.getUnreadNotification = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await notification.find({ to: id, status: NOTI_STATUS.UNREAD });
  if (!data) {
    throw new ApiError(400, "Notification is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getReadNotification = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await notification.find({ to: id });
  if (!data) {
    throw new ApiError(400, "Notification is unavailable");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
