const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : [true, 'userEmail must be provided']
    },
    userPhoneNumber : {
        type : String,
        required : [true, 'userPhoneNumber must be provided']
   
    },
    userName : {
        type : String,
        required : [true,"userName must be provided"]
    },
    userPassword : {
        type : String,
        required : [true,'userPasssword must be provided'],
       // select : false,
        minlength : 8
    },

    role : {
        type : String,
        enum : ["customer","admin"],
        default : "customer"
    },
    otp : {
        type : Number,
        select : false 
    },
    isOtpVerified : {
        type : Boolean,
        default : false,
        select : false 
    }

},{
    timestamps : true
}
)

const User = mongoose.model("User", userSchema)
module.exports = User