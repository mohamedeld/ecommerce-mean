const express = require("express");
const router = express.Router();
const { createBrand, getBrands } = require("../controllers/brandController");
router.route("/").post(createBrand).get(getBrands);

module.exports = router;
