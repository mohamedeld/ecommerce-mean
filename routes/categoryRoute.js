const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
router.route("/").post(createCategory).get(getCategories);
router
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory);
module.exports = router;
