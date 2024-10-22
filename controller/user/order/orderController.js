const Order = require("../../../model/orderSchema")

exports.createOrder = async(req,res)=>{
    const userId = req.user.id
    const { shippingAddress, items, totalAmount, paymentDetails } = req.body
    if(!shippingAddress || !items.length > 0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message : "Please provide shippingAddress, items, totalAmount, paymentDetails"
        })
    }
    await Order.create({
        user : userId,
        shippingAddress,
        totalAmount,
        items,
        paymentDetails
    })
    res.status(200).json({
        message : "Order created successfully"
    })

}

exports.getMyOrders = async(req,res)=>{

    const userId = req.user.id 
    //console.log("userr",userId)
    const orders = await Order.find({user : userId}).populate({
        path:"items.product",
        model : "Product",
        select : "-productStockQty -createdAt -updatedAt -reviews -__v"
    }) 
    //console.log(orders)
    if(orders.length == 0){
        return res.status(404).json({
            message : "No order found",
            data : []
        })
    }
    res.status(200).json({
        message : "orders fetched successfully",
        data : orders

    })

}

exports.updateMyOrder = async(req,res)=>{
   
    const { id } = req.params 
    const {shippingAddress, items } = req.body
    if(!shippingAddress || !items){
        return res.status(400).json({
            message : "Please provide shippingAddress, items"
        })
    }
 
    const existingOrder = await Order.findById(id)
    if(!existingOrder){
        return res.status(400).json({
            message : "No order with that id"
        })
    }

    // check the user who is trying to update is the user who have made the order

    if(existingOrder.user !== userId){
        return res.status(400).json({
            message : "You don't have permission to update"
        })
    }

    if(existingOrder.orderStatus == "ontheway"){
        return res.status(400).json({
            message : "You cannot update order when it is on the way"
        })
    }

    const updatedOrder = await Order.findByIdAndUpdate(id,{shippingAddress, items},{new:true}) 
    res.status(200).json({
        message : "Order updated successfully",
        data : updatedOrder

    })
}

exports.deleteMyOrder = async(req,res)=>{
    const userId = req.user.id 
    const { id } = req.params
    const order = await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message : "No order found"

        })
    }
    if(order.user !== userId){
        return res.status(400).json({
            message : "You don't have permission of this"
        })
    }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message : "Order deleted successfully"
    })
}

exports.canncelOrder = async(req,res)=>{
    const userId = req.user.id 
    const { id } = req.bodys
   
    const order = await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message : "No order found"

        })
    }
    if(order.user !== userId){
        return res.status(400).json({
            message : "You don't have permission of this"
        })
    }
    if(order.orderStatus !== "pending"){
        return res.status(400).json({
            message : "You can't cancel this order now"
        })

        
    }
    const updatedOrder = await Order.findByIdAndUpdate(id,{
        orderStatus : "cancelled"
    },{new : true})
    res.status(200).json({
        message : "Order cancelled successfully",
        data  : updatedOrder
    })


}