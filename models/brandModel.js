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

module.exports = mongoose.model("Brand", brandSchema);
