const mongoose = require('mongoose')
const Product = require('./productModel')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User", //model name
        required : [true,"A review mus belong to user"]
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : [true,"A review ,ust be of product"]
    },
    rating : {
        type : Number,
        required : true,
        default : 3
    },
    message : {
        type : String,
        required : true
    }

},{
    timestamps : true
}
)

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review