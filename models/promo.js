const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    units: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: { type: Boolean, required: true },
    comment: { type: String },    
  },
  {
    timestamps: true,
  }
);

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;