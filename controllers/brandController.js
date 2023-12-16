const Brand = require("../models/brandModel");

exports.createBrand = async (request, response, next) => {
  try {
    const brand = await Brand.create(request.body);
    response.status(200).json({
      status: "success",
      message: "added successfully",
      brand,
    });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBrands = async (request, response, next) => {
  try {
    const brands = await Brand.find();
    response.status(200).json({
      status: "success",

      brands,
    });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
