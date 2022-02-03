const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const db = require("./connection/db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./router"));
app.use(express.static(__dirname + "/public"));
app.use("/upload/image", express.static("upload/image"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
