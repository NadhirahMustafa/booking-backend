var express = require('express');  
const Book = require ('../apps/models/booking')

var router1 = express.Router();   

router1.delete("/booking/delete/:id", async (req, res) => {
	try {
		console.log("id::",req.params.id)
		const deleteResult = await Book.deleteOne({ _id: req.params.id })
		console.log("deleteResult::",deleteResult)
		if(deleteResult.deletedCount === 0){
			res.status(400)
			res.send({ error: {
				message: "Booking ID doesn't exist!"}
			 })
		}
		else {
			res.status(200).send({
				message: "Your appointment has been cancelled!"
			  })
		}
	} catch(error) {
		console.log("err::"+error)
		res.status(500)
		res.json({ error: error})
	}
})

module.exports = router1