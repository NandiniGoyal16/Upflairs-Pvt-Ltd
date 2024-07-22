const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

const User=mongoose.moedel('User', userschema)
module.exports=User