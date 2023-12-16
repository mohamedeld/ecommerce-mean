const Brand = require("../models/brandModel");

const catchAsync = require("../utils/catchAsync");
exports.createBrand = catchAsync(async (request, response, next) => {
  const brand = await Brand.create(request.body);
  response.status(200).json({
    status: "success",
    message: "added successfully",
    brand,
  });
});

exports.getBrands = catchAsync(async (request, response, next) => {
  const brands = await Brand.find();
  response.status(200).json({
    status: "success",

    brands,
  });
});

exports.getBrand = catchAsync(async (request, response, next) => {
  const brand = await Brand.findById(request.params.id);
  if (!brand) {
    return next(
      new AppError(`can not found brand with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    brand,
  });
});
exports.updateBrand = catchAsync(async (request, response, next) => {
  const brand = await Brand.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (!brand) {
    return next(
      new AppError(`can not found brand with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    message: "updated successfully",
    brand,
  });
});
exports.deleteBrand = catchAsync(async (request, response, next) => {
  const brand = await Brand.findByIdAndDelete(request.params.id);
  if (!brand) {
    return next(
      new AppError(`can not found brand with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    message: "deleted successfully",
  });
});
