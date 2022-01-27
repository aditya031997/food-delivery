const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = mongoose.Schema({
  userId: { type: String },
  qty: { type: Number, default: 1 },
  foodDetail: { type: Schema.Types.ObjectId, ref: "food" },
});
module.exports = mongoose.model("cart", cartSchema);
