const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;
const db = require("./connection/db");

app.use("/", require("./router"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
