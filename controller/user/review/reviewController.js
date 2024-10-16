const Product = require("../../../model/productModel")
const Review = require("../../../model/reviewModel")
const { findOneAndDelete } = require("../../../model/userModel")

exports.createReview = async(req,res)=>{
    const userId = req.user.id
    const{rating,message} = req.body
    const productId = req.params.id
    if(!rating || !message || !productId){
        return res.status(400).json({
            message : "Please provide rating,message,productid"
        })
    }
    //check if product of given id exist or not

    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(400).json({
            message : "Product of given id doesnot exist"
        })
    }

// insert into db
    await Review.create({
        userId,
        productId,
        rating,
        message
    })
    res.status(200).json({
        message : "Review added successfully"
    })
}

/*
exports.getProductReview = async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message : "Please  provide productId "
        })
    }
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message : "Product with that id doesn't exist"
        })
    }
    const reviews = await Review.find({productId}).populate("userId")
    res.status(200).json({
        message : "Review fetched successfully",
        data : reviews
    })
} */

exports.deleteReview = async(req,res)=>{
    const reviewId = req.params.id

    // check if that user created this review
    const userId = req.user.id
    const review = Review.findById(reviewId)
    const ownweIdOfReview = review.userId
    if(ownweIdOfReview !== userId){
        return res.status(400).json({
            message : "You do not have premission to delete this review "
        })
    }


    if(!reviewId){
        return res.status(400).json({
            message : "Please Provide reviewid"
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message : "Review delete successfully"
    })

}

exports.getMyReviews = async(req,res)=>{
    const userId = req.user.id
    const reviews = await Review.find({userId})
    if(reviews.length == 0){
        res.status(404).json({
            message : " You havenot given any review",
            reviews : []
        })
    }else{
        res.status(200).json({
            message : "Reviews fetched successfully",
            reviews 
        })
    }

}