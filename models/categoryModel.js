const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter category name"],
  },
  color: {
    type: String,
    required: [true, "please enter category color"],
  },
  icon: {
    type: String,
    required: [true, "please enter category icon"],
  },
});
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});
categorySchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Category", categorySchema);
