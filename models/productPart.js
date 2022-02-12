const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productPartSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imgs: [{ type: mongoose.Types.ObjectId, ref: "Img" }],
    type: { type: String, required: true, default: false },
    price :{ type: Number, required: true },
    provider: { String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductPart = mongoose.model("ProductPart", productPartSchema);

module.exports = ProductPart;