const express = require("express")
const mongoose = require("mongoose") // new
const create = require("./createBooking") // new
const update = require("./editBooking")


// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://NadhirahM:harihDanNitaf@cluster0.pxlv8.mongodb.net/Booking?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json()) // new 
		// app.use("/api", routes) // new
        app.use("/api", create)
        app.use("/api", update)

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
    .catch((error) => {
        console.log("ERROR::",error)
    })