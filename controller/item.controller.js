const Item = require("../model/Item");

exports.addItem = async ( req, res ) => {
    try {
        const { name, price, desc } = req.body;
        const addedItem =  new Item({name, price, desc});
        const result = await addedItem.save();
        res.status(201).json({
            message:"Item created successfully",
            order:result
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.getAllItems = async ( req, res ) => {
    try {
        const items = await Item.find();
        if(items.length ==0){
            return res.status(404).json({
                message:"No items found"
            })
        }
        res.status(200).json({
            items:items
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.getItemById = async ( req, res ) => {
    
    try {
        const {id}= req.params;
        const foundedItem = await Item.findById(id);
        if(!foundedItem){
            return res.status(404).json({
                message:"Item not found"
            })
        }
        res.status(200).json({
            item:foundedItem
        })
        
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

exports.updateItem = async ( req, res ) => {
    try {
        const {id} = req.params;
        const foundedItem = await Item.findById(id);
        if(!foundedItem){
            return res.status(404).json({
                message:"Item not found"
            })
        }
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({
            message:"Item updated successfully",
            item:updatedItem
        })

    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

exports.deleteItem = async ( req, res ) => {
    const {id} = req.params;
    try {
        const foundedItem= await Item.findById(id);
        if(!foundedItem){
            return res.status(404).json({
                message:"Item not found"
            })
        }
        await Item.findByIdAndDelete(id);
        res.status(200).json({
            message:"Item deleted successfully"
        })
    } catch (error) {
        res.status(500).json({message:err.message})
    }
}