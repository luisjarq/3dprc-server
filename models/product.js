const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    imgs: [{ type: String }],
    productParts: [{ type: mongoose.Types.ObjectId, ref: "ProductPart" }],
    price :{ type: Number, required: true },
    discount :{ type: Number, required: true },    
    stock :{ type: String, required: true },    
    type :{ type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;