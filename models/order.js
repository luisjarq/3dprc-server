const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    adress: { type: String, required: true },
    date: { type: Date, required: true },
    payment: { type: String, required: true },
    cart: [{ type: mongoose.Types.ObjectId, ref: "Cart" }],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Order", cartSchema);

module.exports = Cart;
