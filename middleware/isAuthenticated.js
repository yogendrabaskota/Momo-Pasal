const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const User = require("../model/userModel")

const isAuthenticated = async (req,res,next) => {
    const token = req.headers.authorization
    if(!token) {
       return res.status(403).json({
            message : "please log in"
        })
    }
//verify token is legit or not
// jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
//     if(err){
//         res.status(400).json({
//             message: "Invalid token"
//         })
//     }else{
//         res.status(200).json({
//             message : "valid token"
//         })
//     }
//}) 

    // another method 
try { 
    const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    const doesUserExist = await User.findOne({_id : decoded.id})
    

    if(!doesUserExist){
        return res.status(404).json({
            message : "user doesn't exist with that token/id"
        })

    }
    req.user = doesUserExist
        next()

}catch(error){ 
    res.status(400).json({
        message : error.message
    })
   
    
    }

}
module.exports = isAuthenticated
