const express = require("express");
const mongoose = require("mongoose");
const create = require("./controller/createBooking");
const update = require("./controller/editBooking");
const list = require("./controller/listBooking");
const deleteBooking = require("./controller/deleteBooking");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

console.log("url::", process.env.ATLAS_URI);
mongoose
  .connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/api", create);
    app.use("/api", update);
    app.use("/api", list);
    app.use("/api", deleteBooking);

    app.listen(process.env.PORT, () => {
      console.log("Server has started!");
    });
  })
  .catch((error) => {
    console.log("ERROR::", error);
  });
