var express = require('express');        
var mongoose = require('mongoose');
const Book = require ('./apps/models/booking')

var router1 = express.Router();   

// Update booking
router1.put("/booking/update/:id", async (req, res) => {
      try {
        const post = await Book.findOne({ _id: req.params.id })
    
        if (req.body.user) {
          post.user = req.body.user
        }
    
        if (req.body.booking_date) {
          post.booking_date = req.body.booking_date
        }
    
        await post.save()
        res.send(post)
      } catch {
        res.status(404)
        res.send({ error: "Booking id doesn't exist!" })
      }
    })

module.exports = router1