const mongoose = require('mongoose')    
const Item = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
})
module.exports =  mongoose.model( 'Item' , Item)