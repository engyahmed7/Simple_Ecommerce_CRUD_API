const mongoose = require('mongoose')    
const Order = mongoose.Schema({
    totalPrice : {
        type : Number,
        required : true,
    },
    items: [
        {
          itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Item'
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
})
module.exports =  mongoose.model( 'orders' , Order)