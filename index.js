const express = require("express")
const mongoose = require("mongoose") // new
const create = require("./createBooking") // new
const update = require("./editBooking")
const dotenv = require('dotenv')
dotenv.config();

console.log("url::",process.env.ATLAS_URI);
// Connect to MongoDB database
mongoose
	.connect(process.env.ATLAS_URI, { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json()) // new 
		// app.use("/api", routes) // new
        app.use("/api", create)
        app.use("/api", update)

		app.listen(process.env.PORT, () => {
			console.log("Server has started!")
		})
	})
    .catch((error) => {
        console.log("ERROR::",error)
    })