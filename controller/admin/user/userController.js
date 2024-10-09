const User = require("../../../model/userModel")

exports.getUsers = async(req,res) =>{
   
    const users = await User.find().select(["+otp","+isOtpVerified","-__v",])
    

    
    const roles = users.map(user => user.role);
   // const{role} = req.body
    // if(a == "admin"){
    //     console.log(a)

    // } else{
    //     console.log(a)
    // }
    const adminUsers = users.filter(user => user.role === 'admin');
    console.log(roles)
    if (roles.includes('admin') || users.length > 1) {
        res.status(200).json({
            message : "DOnee",
            data : adminUsers
        })
    }else{
        res.status(400).json({
            message : "errorrrr"
        })
    }
    return
    if(users.length > 1){
        res.status(200).json({
            message : "Users fetched successfully",
            data : users
        })
    }else{
        res.status(400).json({
            message : "User collection is empty",
            data : []
        })
    }
}