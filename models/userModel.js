const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    booking: [{
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
    }],
    isBlocked: {
        type: String,
    },
    role:{
        type:String,
    }
})

module.exports = mongoose.model("Users",userSchema)