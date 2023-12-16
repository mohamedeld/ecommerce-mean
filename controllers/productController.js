const Product = require("../models/productModel");

exports.createProduct = async (request, response, next) => {
  try {
    const product = await Product.create(request.body);
    response.status(200).json({
      status: "success",
      message: "added successfully",
      product,
    });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProducts = async (request, response, next) => {
  try {
    const products = await Product.find();
    response.status(200).json({
      status: "success",

      products,
    });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
