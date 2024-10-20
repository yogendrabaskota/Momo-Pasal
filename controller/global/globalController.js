//const Product = require("../../../model/productModel")
const Product = require("../../model/productModel") 


exports.getProducts = async (req,res) =>{
    const products = await Product.find()
    if(products.length == 0){
        res.status(400).json({
            message : "no Product found",
            data : []
        })
    }else{
        res.status(200).json({
            message : "Product fetched successfully",
            data : products
       
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
    const productReviews = await Review.find({productId : id}).populate("userId")
    if(product.length == 0){
        res.status(400).json({
            message : "No product found with that id",
            data : {
                data : [],
                data2 : []
            }    
        })
    }else{
        res.status(200).json({
            message : "Product fetched successfully",
            data :{ 
                product,
                productReviews 
            }
        })
    }



} 
