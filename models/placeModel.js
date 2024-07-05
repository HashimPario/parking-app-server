const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    areaId: {
        type: String,
        required: true,
    },
    totalSlots: {
        type: Number,  
        required: true, 
    },
    placeData: [{
        placeName: {
            type: String,
            required: true,  
        },
        slotsQuantity: {
            type: Number,  
            required: true,  
        },
        bookings: [{
           
        }],
        slotsData: [{
            slotNumber: {
                type: Number,  
                required: true,
            },
            bookingDate: {
                type: String,
            },
            bookFrom: {
                type: String,
            },
            bookTo: {
                type: String,
            },
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model("Places", placeSchema);
