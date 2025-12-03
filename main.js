const express = require("express");
const cors = require("cors");
const fastfoodRouter = require("./router/fastfood.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

/// router

app.use(fastfoodRouter);

app.listen(PORT, () => {
  console.log("Server is runnig at: http://localhost:" + PORT);
});
