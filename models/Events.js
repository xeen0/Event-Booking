const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    date:{
        type:Date
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
    
})


module.exports = mongoose.model('Events' ,EventSchema )