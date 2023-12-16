const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCount,
  getFeaturedProduct,
} = require("../controllers/productController");
router.route("/").post(createProduct).get(getProducts);
router.route("/count").get(getCount);
router.route("/featured-products/:count").get(getFeaturedProduct);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);
module.exports = router;
