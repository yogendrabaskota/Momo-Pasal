
const User = require("../../../model/userModel")


// get my profile controller
exports.getMyProfile = async(req,res)=>{
    const userId = req.user.id
    const myProfile = await User.findById(userId)

    //send response
    res.status(200).json({
        message : "Profile fetrched successfully",
        data : myProfile
    })
}


// uodate my profile controller
exports.updateMyProfile=async(req,res)=>{
    const {userName, userEmail, userPhoneNumber} = req.body
    const userId = req.User.id
    const updatedData = await User.findByIdAndUpdate(userId,{userName,userEmail,userPhoneNumber},{
        runValidators : true,
        new : true
    })
    res.status(200).json({
        message : "profile updated successfully",
        data : updatedData
    })

}


// delete my profile controller
exports.deleteMyProfile=async(req,res)=>{
    const userId = req.User.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message : "Profile deleated Successfully"
    })
}