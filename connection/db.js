const mongoose = require("mongoose");
// console.log(process.env.DB_CONNECTION, "nnnnnnn");
// console.log("kkkkkkkkkkkkk");
mongoose.connect(
  "mongodb+srv://thapa:vinodthapa@cluster0.h0jsc.mongodb.net/merndata?retryWrites=true&w=majority",

  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("database connect success fully");
    }
  }
);
