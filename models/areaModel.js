const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    areaName: {
        type: String,
        required: true,
    },
    areaQty: {
        type: String,
    },
    slotQty: {
        type: String,
    }
},{timestamps:true})

module.exports = mongoose.model("Areas",areaSchema)