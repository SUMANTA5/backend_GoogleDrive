const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { APP_PORT, DB_URL } = require("./config");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const user_routes = require("./routes/authRoutes");
app.use("/", user_routes);


app.listen(APP_PORT, () => {
    console.log(`Example app listening on port ${APP_PORT}`);
  });
  
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Database Successfully connected.");
    })
    .catch((err) => {
      console.log(err);
    });
