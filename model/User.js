const mongoose = require('mongoose')    
const User = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    age:{
        type : Number,
        required:true
    }
})
module.exports =  mongoose.model( 'users' , User)