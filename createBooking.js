var express = require("express"); // call express
// var app = express();                 // define our app using express
var mongoose = require("mongoose");
const Book = require("./apps/models/booking");
const moment = require("moment");
// const router1 = require("./editBooking");
const { timeList } = require("./apps/config/timeList");

var router = express.Router(); // get an instance of the express Router

// Get all posts
router.post("/booking/create", async (req, res) => {
  console.log("REQ::", req.body);
  let today = new Date();
  
  var newBookingDate = moment(req.body.booking_date);
  let diffBookingTwoDays = newBookingDate.diff(moment(today), "days");
  let diffBookingThreeWeek = newBookingDate.diff(moment(today), "weeks");
  
  //check booking date comply to rules
  if (diffBookingThreeWeek < 3 && diffBookingTwoDays > 2) {
      // check date dari database
      const dateUser = await Book.findOne({booking_date: req.body.booking_date,}); 
      // check time dari database
      const timeUser = await Book.findOne({booking_time: req.body.booking_time,}); 
      console.log("post::", dateUser);

      if (dateUser == null && timeUser == null) { 
            for (var i in timeList) { 
            console.log("i::", timeList[i]);

            if (timeList[i] === req.body.booking_time) {
            const post = new Book({
                  user: req.body.user,
                  booking_date: req.body.booking_date,
                  booking_time: req.body.booking_time,
            });
            await post.save();
            res.send(post);
            break;
            }
            }
      } else if (dateUser != null && timeUser == null) { 
            for (var i in timeList) {
                  console.log("i::", timeList[i]);
                  if (timeList[i] === req.body.booking_time) {
                        const post = new Book({
                        user: req.body.user,
                        booking_date: req.body.booking_date,
                        booking_time: req.body.booking_time,
                        });
                        await post.save();
                        res.send(post);
                        break;
                  }
            }

      } else if (dateUser == null) { 
            for (var i in timeList) {
                  console.log("i::", timeList[i]);
                  if (timeList[i] === req.body.booking_time) {
                        const post = new Book({
                        user: req.body.user,
                        booking_date: req.body.booking_date,
                        booking_time: req.body.booking_time,
                        });
                        await post.save();
                        res.send(post);
                        break;
                  }
            }
      } else {
      res.status(404);
      let str = [];
      for(var i in timeList){
            str.push(timeList[i]);
      }
      res.send({
            message: "Choose other time ex: "+ JSON.stringify(str)
      });
      }

} else {
      res.status(404);
      res.send({
            message: "Booking date must be two days early and not ealier than three weeks" 
      });
}
});

module.exports = router;

// require('./route/create')(app);
