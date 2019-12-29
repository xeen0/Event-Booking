const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    event:{
        type:mongoose.Types.event,
        ref:'Event',
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

mmodule.exports = mongoose.model('Booking' , bookingSchema)