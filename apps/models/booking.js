var mongoose = require('mongoose'); 

var BookingSchema   = mongoose.Schema({
	user: String,
	booking_date: Date,
	booking_time: String 
});

        
module.exports = mongoose.model('BookingList', BookingSchema);