const express = require("express");
const router = express.Router();
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
router.route("/").post(createBrand).get(getBrands);
router.route("/:id").get(getBrand).patch(updateBrand).delete(deleteBrand);
module.exports = router;
