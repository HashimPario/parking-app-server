const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    bookingData: [{
        placeName:{
            type: String,
        },
        slotNumber:{
            type: String,
        },
        bookingDate:{
            type: String,
        },
        bookingFrom:{
            type: String,
        },
        bookingTo:{
            type: String,
        },
        cost:{
            type: String,
        }
    }]
   
})

module.exports = mongoose.model("Bookings",bookingSchema)