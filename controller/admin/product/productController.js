const Product = require("../../../model/productModel")
const fs = require("fs")

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


exports.deleteProduct = async(req,res)=>{
    const{id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide ID"
        })
    }

    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.LIVE_SERVER.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)
 

   // if(req.file && req.file.filename){
          // delwtw file from upload folder
        fs.unlink("./uploads/" + finalFilePathAfterCut,(err)=>{
            if(err){
                console.log("Error deleting FIle",err)
            }else{
                console.log("File deleted successfully")
            }
        })
    //}
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message : "Product deleted successfully"
    })
}

exports.editProduct = async(req,res)=>{
    const{id} = req.params
    const{productName,productDescription,productPrice,productStatus,productStockQty} = req.body
   // console.log(productName,productDescription,productPrice,productStatus,productStockQty)
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message : "Please provide productName,productDescription,productPrice,productStatus,productStockQty"
        })
    } 
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(400).json({
            message : "No data found with that id"
        })
    }
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.LIVE_SERVER.length
    const finalFilePathAfteCut = oldProductImage.slice(lengthToCut)

    if(req.file && req.file.filename){
        fs.unlink("./uploads/" + finalFilePathAfteCut,(err)=>{
            if(err){
                console.log("Error deleting FIle")
            }else{
                console.log("File deleted successfully")
            }
        })


    }
    const datas = await Product.findByIdAndUpdate(id, {

        productName,
        productDescription,
        productPrice,
        productStatus,
        productStockQty,
        productImage : req.file && req.file.filename ? process.env.LIVE_SERVER + req.file.filename : oldProductImage
        
    },{
        new : true
    })
    res.status(200).json({
        message : "Product Updated successfully",
        data : datas
    })
}