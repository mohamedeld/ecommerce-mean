const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
exports.createCategory = catchAsync(async (request, response, next) => {
  const category = await Category.create(request.body);
  response.status(200).json({
    status: "success",
    message: "added successfully",
    category,
  });
});

exports.getCategories = catchAsync(async (request, response, next) => {
  const categories = await Category.find();
  response.status(200).json({
    status: "success",

    categories,
  });
});

exports.getCategory = catchAsync(async (request, response, next) => {
  const category = await Category.findById(request.params.id);
  if (!category) {
    return next(
      new AppError(
        `can not found category with this id ${request.params.id}`,
        404
      )
    );
  }
  response.status(200).json({
    status: "success",
    category,
  });
});
