const Product = require("../../../model/productModel")

//const Product = require("../../model/productModel")
exports.createProduct = async(req,res) => {

    const file = req.file
    if(!file){
        return res.status(400).json({
            message : "Product Image must be provided"
        })
    }
    let filePath 
        if(!file){
            filePath = "https://static.india.com/wp-content/uploads/2022/09/FotoJet-20.jpg"
        }else{
            filePath = req.file.filename
            }
            


    const{productName, productDescription,productPrice,productStatus,productStockQty} = req.body
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
        return res.status(400).json({
            message : "Please provide all productName,description,price,status and stock quantity related data"
        })
    }
  

    await Product.create({
        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
         productImage : process.env.LIVE_SERVER + filePath
        // productImage : filePath


    })
    res.status(200).json({
        message : "Product created successfully"
    })


}