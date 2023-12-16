const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
} = require("../controllers/categoryController");
router.route("/").post(createCategory).get(getCategories);
router.route("/:id").get(getCategory);
module.exports = router;
