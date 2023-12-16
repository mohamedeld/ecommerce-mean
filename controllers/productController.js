const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");

exports.createProduct = catchAsync(async (request, response, next) => {
  const category = await Category.findById(request.body.category);
  if (!category) {
    return next(
      new AppError(
        `this category with ${request.body.category} id was not found`,
        404
      )
    );
  }
  const brand = await Brand.findById(request.body.brand);
  if (!brand) {
    return next(
      new AppError(`this brand with ${request.body.brand} was not found`, 404)
    );
  }
  const product = await Product.create(request.body);
  response.status(200).json({
    status: "success",
    message: "added successfully",
    product,
  });
});

exports.getProducts = catchAsync(async (request, response, next) => {
  let filter = [];
  if (request.query.categories) {
    filter = request.query.categories.split(",");
  }
  const products = await Product.find({ category: filter });
  response.status(200).json({
    status: "success",

    products,
  });
});
exports.getProduct = catchAsync(async (request, response, next) => {
  const product = await Product.findById(request.params.id).populate(
    "category"
  );
  if (!product) {
    return next(
      new AppError(
        `can not found product with this id ${request.params.id}`,
        404
      )
    );
  }
  response.status(200).json({
    status: "success",
    product,
  });
});
exports.updateProduct = catchAsync(async (request, response, next) => {
  const category = await Category.findById(request.body.category);
  if (!category) {
    return next(
      new AppError(
        `this category with ${request.body.category} id was not found`,
        404
      )
    );
  }
  const brand = await Brand.findById(request.body.brand);
  if (!brand) {
    return next(
      new AppError(`this brand with ${request.body.brand} was not found`, 404)
    );
  }
  const product = await Product.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  if (!product) {
    return next(
      new AppError(
        `can not found product with this id ${request.params.id}`,
        404
      )
    );
  }
  response.status(200).json({
    status: "success",
    message: "updated successfully",
    product,
  });
});
exports.deleteProduct = catchAsync(async (request, response, next) => {
  const product = await Product.findByIdAndDelete(request.params.id);
  if (!product) {
    return next(
      new AppError(
        `can not found product with this id ${request.params.id}`,
        404
      )
    );
  }
  response.status(200).json({
    status: "success",
    message: "deleted successfully",
  });
});

exports.getCount = catchAsync(async (request, response, next) => {
  const productCount = await Product.countDocuments();
  if (!productCount) {
    return next(new AppError("there is something wrong", 400));
  }
  response.status(200).json({
    status: "success",
    productCount,
  });
});
exports.getFeaturedProduct = catchAsync(async (request, response, next) => {
  const count = request.params.count ? request.param.count : 0;
  const productFeature = await Product.find({ isFeatured: true }).limit(+count);
  if (!productFeature) {
    return next(new AppError("there is something wrong", 400));
  }
  response.status(200).json({
    status: "success",
    productFeature,
  });
});
