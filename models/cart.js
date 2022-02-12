const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    date: { type: Date, required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
