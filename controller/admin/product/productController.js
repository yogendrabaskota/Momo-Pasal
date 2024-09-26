const Product = require("../../../model/productModel")

//const Product = require("../../model/productModel")
exports.createProduct = async(req,res) => {
    const{productName, productDescription,productPrice,productStatus,productStockQty} = req.body
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
        return res.status(400).json({
            message : "Please provide all product related data"
        })
    }

    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty

    })
    res.status(200).json({
        message : "Product created successfully"
    })


}