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

exports.getProducts = async (req,res) =>{
    const product = await Product.find()
    if(product == 0){
        res.status(400).json({
            message : "no Product found"
        })
    }else{
        res.status(200).json({
            message : "Product fetched successfully",
            product
       
        })
    }

}

exports.getProduct = async (req,res)=> {
    const{id} = req.params 
    if(!id){
        return res.status(400).json({
            message : "please provide id(productid)",
            
        })
    }
    const product = await Product.find({_id : id})
    if(product.length == 0){
        res.status(400).json({
            message : "No product found with that id",
            product : [] 
        })
    }else{
        res.status(200).json({
            message : "Product fetched successfully",
            product
        })
    }



} 