const catchAsync = require("../middleware/async");
const orderForm = require("../models/orderForm");
const Service = require("../models/service");
const SubService = require("../models/subService");
const ApiError = require("../utils/ApiError");
const customer = require("../models/customer");
const { io } = require("socket.io-client");
// _id.valueOf() --> lấy id từ object id
exports.createService = catchAsync(async (req, res) => {
  const { type, price, description } = req.body;
  const { id } = req.user;
  const service = await Service.create({
    accountId: id,
    type,
    price,
    description,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.addService = catchAsync(async (req, res) => {
  const { type, price, description } = req.body;
  const { id } = req.params;
  const service = await Service.create({
    accountId: id,
    type,
    price,
    description,
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    service,
  });
});
exports.deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    throw new ApiError(400, "Service is not available");
  }
  await service.remove();
  await SubService.findOneAndDelete({ serviceId: id });
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
  });
});
exports.deleteSubService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const subServices = await SubService.findById(id);
  if (!subServices) {
    throw new ApiError(400, "Service is not available");
  }
  await subServices.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully!",
  });
});
exports.updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, price, description } = req.body;
  const service = await Service.findByIdAndUpdate(
    id,
    { type: type, price: price, description: description },
    { new: true }
  );
  if (!service) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    message: "Update successfully",
    serviceInfor: service,
  });
});

// ===================================================== //

exports.getAllService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Service.find({ garageId: id });
  if (!data) {
    throw new ApiError(400, "Service is not available");
  }
  res.status(200).json({
    success: true,
    data,
  });
});
exports.getSubService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const subService = await SubService.find({ serviceId: id });
  if (!subService) {
    throw new ApiError(400, "This service is not available");
  }
  res.status(200).json({
    success: true,
    subService,
  });
});
