const jwt = require("jsonwebtoken")
const {promisify} = require("util").promisify


const isAuthenticated = async (req,res,next) => {
const token = req.headers.authorization
if(!token) {
    res.status(403).json({
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

const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
if(!decoded){
    return res.status(403).json({
        message : "do't try to do this"
    })
} 
// check if user decoded.id(userid) exists in the table
const doesUserExist = await UserActivation.findOne({_id : decoded.id})
if(!doesUserExist){
    return res.status(404).json({
        message : "user doesn't exist with that token/id"
    })

}
req.user = "Apple"
    next()
}
module.exports = isAuthenticated
