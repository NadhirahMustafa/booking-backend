var mongoose = require('mongoose'); 

var BookingSchema   = mongoose.Schema({
	user: String,
	date: Date,
	time: String 
});

        
module.exports = mongoose.model('BookingList', BookingSchema);