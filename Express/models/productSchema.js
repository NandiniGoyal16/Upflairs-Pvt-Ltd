const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    }
},{timestamps:true})

exports.Product=mongoose.model('Product', productschema)