
const User = require("../../../model/userModel")
const bcrypt = require("bcryptjs")



exports.getMyProfile = async(req,res)=>{
    const userId = req.user.id
    const myProfile = await User.findById(userId)

    //send response
    res.status(200).json({
        message : "Profile fetrched successfully",
        data : myProfile
    })
}



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



exports.deleteMyProfile=async(req,res)=>{
    const userId = req.User.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message : "Profile deleated Successfully"
    })
}

exports.updateMyPassword = async(req,res)=>{
    const userId = req.user.id
    const {oldPassword, newPassword, confirmPassword} = req.body
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide oldPassword, Newpassword and COnfirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : " newpassword and oldpassword are not same"
        })
    }


    // remove hash of old password
    const userData = await User.findById(userId)
    const HashedOldPassword = userData.userPassword



    //check oldpassword is correct or not
    const isOldPasswordcorrect = bcrypt.compareSync(oldPassword,HashedOldPassword)
    if(!isOldPasswordcorrect){
        return res.status(400).json({
            message : "Old password didn't matched"
        })
    }
    userData.userPassword = bcrypt.hashSync(newPassword,10)
    await userData.save()

}