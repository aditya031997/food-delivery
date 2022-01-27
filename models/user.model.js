const mongoose = require("mongoose");
// const profileImg = require("../../public/images/avatar/2.jpg")
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("user", userSchema);
