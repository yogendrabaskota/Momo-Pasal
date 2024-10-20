//const { default: mongoose } = require("mongoose")
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