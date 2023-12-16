const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.createUser = catchAsync(async (request, response, next) => {
  const hashedPassword = await bcrypt.hash(request.body.password, 12);
  const user = await User.create({
    name: request.body.name,
    email: request.body.email,
    password: hashedPassword,
    phone: request.body.phone,
    isAdmin: request.body.isAdmin,
    street: request.body.street,
    apartment: request.body.apartment,
    zip: request.body.zip,
    city: request.body.city,
    country: request.body.country,
  });
  response.status(200).json({
    status: "success",
    message: "added successfully",
    user,
  });
});

exports.getUsers = catchAsync(async (request, response, next) => {
  const users = await User.find();
  response.status(200).json({
    status: "success",

    users,
  });
});

exports.getUser = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    return next(
      new AppError(`can not user brand with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    user,
  });
});
exports.updateUser = catchAsync(async (request, response, next) => {
  const updatedFields = {
    name: request.body.name,
    email: request.body.email,

    phone: request.body.phone,
    isAdmin: request.body.isAdmin,
    street: request.body.street,
    apartment: request.body.apartment,
    zip: request.body.zip,
    city: request.body.city,
    country: request.body.country,
  };
  if (request.body.password) {
    const hashedPassword = await bcrypt.hash(request.body.password, 12);
    updatedFields.password = hashedPassword;
  }
  const user = await User.findByIdAndUpdate(request.params.id, updatedFields, {
    new: true,
  });
  if (!user) {
    return next(
      new AppError(`can not found user with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    message: "updated successfully",
    user,
  });
});
exports.deleteUser = catchAsync(async (request, response, next) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) {
    return next(
      new AppError(`can not found user with this id ${request.params.id}`, 404)
    );
  }
  response.status(200).json({
    status: "success",
    message: "deleted successfully",
  });
});
