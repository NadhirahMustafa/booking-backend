var express = require("express");
var mongoose = require("mongoose");
const Book = require("../apps/models/booking");

var router1 = express.Router();

router1.get("/booking", async (req, res) => {
  try {
    const post = await Book.find({}).sort({date : -1});
    res.send(post);
  } catch (error) {
    console.log("err::" + error);
    res.status(500);
    res.json({ error: error });
  }
});

module.exports = router1;
