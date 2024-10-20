const Product = require("../../../model/productModel")
const User = require("../../../model/userModel")

exports.addToCart = async(req,res)=>{
    const userId = req.user.id
    const {productId} = req.params 
    if(!productId) {
        return res.status(400).json({
            message : "Please provide productId"
        })
    }
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message : "No product found with what productId"
        })
    }

    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save()
    res.status(200).json({
        message : "Product added to cart"
    })
}

exports.getMyCartItems = async(req,res)=>{
    const userId = req.user.id
    const userData = await User.findById(userId).populate({
        path : "cart",
        select : "-productStatus"
    })
    //console.log(userData)
    //const cartData = userData.cart
   // console.log(cartData)

    res.status(200).json({
        message : "Cart Item Fetched successfully",
        data : userData.cart
    })
}

exports.deleteCartItems = async(req,res)=>{
    const {productId} = req.params
    const userId = req.user.id
    const product = await Product.findById(productId)
    if(!product) {
        return res.status(404).json({
            message : "can't found given product id"
        })
    }
    const user = await User.findById(userId)
    user.cart = user.cart.filter((pId)=>pId != productId)
    await user.save()
    res.status(200).json({
        message : "Cart item deleted successfully"
    })
}