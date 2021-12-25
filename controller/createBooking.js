var express = require("express");
const Book = require("../apps/models/booking");
const moment = require("moment");
const { timeList } = require("../apps/config/timeList");

var router = express.Router();

router.post("/booking/create", async (req, res) => {
  try {
    console.log("REQ::", req.body);
    let today = new Date();
    var newBookingDate = moment(req.body.date);
    let diffBookingTwoDays = newBookingDate.diff(moment(today), "days");
    let diffBookingThreeWeek = newBookingDate.diff(moment(today), "weeks");

    if (diffBookingThreeWeek < 3 && diffBookingTwoDays > 2) {
      const dateUser = await Book.findOne({ date: req.body.date });
      const timeUser = await Book.findOne({ time: req.body.time });
      console.log("post::", dateUser);

      if (dateUser == null && timeUser == null) {
        for (var i in timeList) {
          console.log("i::", timeList[i]);

          if (timeList[i] === req.body.time) {
            const post = new Book({
              user: req.body.user,
              date: req.body.date,
              time: req.body.time,
            });
            await post.save();
            res.send(post);
            break;
          }
        }
      } else if (dateUser != null && timeUser == null) {
        for (var i in timeList) {
          console.log("i::", timeList[i]);
          if (timeList[i] === req.body.time) {
            const post = new Book({
              user: req.body.user,
              date: req.body.date,
              time: req.body.time,
            });
            await post.save();
            res.send(post);
            break;
          }
        }
      } else if (dateUser == null) {
        for (var i in timeList) {
          console.log("i::", timeList[i]);
          if (timeList[i] === req.body.time) {
            const post = new Book({
              user: req.body.user,
              date: req.body.date,
              time: req.body.time,
            });
            await post.save();
            res.send(post);
            break;
          }
        }
      } else {
        res.status(400);
        let str = [];
        for (var i in timeList) {
          str.push(timeList[i]);
        }
        res.send({
          error: {
            message:
              "Sorry! The selected time slot has been occupied. Please choose other time slot: " +
              JSON.stringify(str),
          },
        });
      }
    } else {
      res.status(400);
      res.send({
        error: {
          message:
            "Ooppss! Booking date must be two days early and not ealier than three weeks",
        },
      });
    }
  } catch (error) {
    console.log("err::" + error);
    res.status(500);
    res.json({ error: error });
  }
});

module.exports = router;
