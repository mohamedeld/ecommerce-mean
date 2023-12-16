const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter brand name"],
  },
  image: {
    type: String,
    required: [true, "please enter brand image"],
  },
});
brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
brandSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Brand", brandSchema);
