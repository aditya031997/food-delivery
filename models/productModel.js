const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  // foodId: [{ type: mongoose.Schema.Types.ObjectID, ref: "cart" }],
  foodName: {
    type: String,
  },
  foodPrice: {
    type: Number,
  },
  foodType: {
    type: String,
  },
  avtar: {
    type: String,
  },
});
module.exports = mongoose.model("food", productSchema);
