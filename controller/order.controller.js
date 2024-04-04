const Item = require("../model/Item");
const Order = require("../model/Order");

exports.getAllOrders = async ( req, res ) => {
    try {
        const orders=await Order.find()
        if(orders.length ==0){
            return res.status(404).json({
                message:"No orders found"
            })
        }
        res.status(200).json({
            orders:orders
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.addNewOrders = async (req, res) => {
    try {
        const { items } = req.body;
        
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const foundItem = await Item.findById(item.itemId);
            if (!foundItem) {
                return res.status(404).json({
                    message: `Item with ID ${item.itemId} not found`
                });
            }
            totalPrice += foundItem.price * item.quantity;
        }

        const newOrder = new Order({ totalPrice, items });
        await newOrder.save();

        res.status(201).json({
            message: "Order added successfully",
            order: newOrder
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


exports.getOrderById = async ( req, res ) => {
    const{id}=req.params;
    try {
        const foundedOrder = await Order.findById(id);
        if(!foundedOrder){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        res.status(200).json({
            order:foundedOrder
        })
    } catch (error) {
        res.status(500).json({message:err.message})
    }
}

exports.deleteOrder = async ( req, res ) => {
    try {
        const {id} = req.params;
        const foundedOrder = await Order.findById(id);
        if(!foundedOrder){
            return res.status(404).json({
                message:"Order not found"
            })
        }

        await Order.findByIdAndDelete(id);
        res.status(200).json({
            message:"Order deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.updateOrder = async ( req, res ) => {
    try {
        const {id} = req.params;
        const {itemIds} = req.body;
        const foundedOrder = await Order.findById(id);
        if(!foundedOrder){
            return res.status(404).json({
                message:"Order not found"
            })
        }
        const foundedItems = await Item.find({_id:{$in:itemIds}});
        if(foundedItems.length == 0){
            return res.status(404).json({
                message:"Items not found"
            })
        }
        let totalPrice = 0;
        foundedItems.forEach(item=>{
            totalPrice += item.price;
        })
        
        const updatedOrder = await Order.findByIdAndUpdate(id,{totalPrice,itemIds},{new:true});
        res.status(200).json({
            message:"Order updated successfully",
            order:updatedOrder
        })
    } catch (error) {
        res.status(500).json({
            message:err.message
        })
    }
}
