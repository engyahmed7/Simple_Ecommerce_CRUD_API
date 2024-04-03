const mongoose = require('mongoose')    
const Order = mongoose.Schema({
    totalPrice : {
        type : Number,
        required : true,
    },
    itemIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    }]

})
module.exports =  mongoose.model( 'orders' , Order)