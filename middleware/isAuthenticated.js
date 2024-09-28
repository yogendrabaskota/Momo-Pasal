const isAuthenticated = (req,res,next) => {
    

const token = req.headers.authorization
if(!token) {
    res.status(403).json({
        message : "please provide token"
    })
}
//verify token is legit or not
jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
    if(err){
        res.status(400).json({
            message: "Invalid token"
        })
    }else{
        res.status(200).json({
            message : "valid token"
        })
    }
}) 

}
module.exports = isAuthenticated