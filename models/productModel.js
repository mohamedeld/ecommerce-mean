const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
  },
  image: {
    type: String,
    required: [true, "please enter product image"],
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  richDescription: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 1,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Product", productSchema);
