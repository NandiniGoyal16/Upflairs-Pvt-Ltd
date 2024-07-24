const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        requird: true
    },
    price:{
        type:Number,
        requird: true
    },
    description:{
        type:String,
        requird: true
    },
    image:{
        type:String,
        requird: true
    },
    category:{
        type:String,
        requird: true
    },
},{ timestamps: true })

exports.Product=mongoose.model('Product',productSchema)