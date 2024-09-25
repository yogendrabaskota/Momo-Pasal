

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../model/userModel")
const sendEmail = require("../../services/sendEmail")

//Register user
exports.registerUser = async(req,res)=>{
    const {email,password,phoneNumber,username} = req.body
    if(!email || !password || !phoneNumber || !username) {
       res.status(400).json({
           message : "please provide email,password,phoneNumber"
       })
   }
  // check that if email user already exist or not 
  const userFound = await User.find({userEmail : email})
  if(userFound.length > 0) {
   return res.status(400).json({
       message : "user with that email already exist. please use unique email"
   })
  }

  
  //creating database collection
   await User.create({ 
       userName : username,
       userPhoneNumber : phoneNumber,
       userEmail : email,
       userPassword : bcrypt.hashSync(password,10)
   })
   res.status(201).json({
       message : "User registered successfully"
   })
   
}

//Login user
exports.loginUser = async(req,res)=>{
    const{email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            message : "please provide email and password"
        })
    }
    //check if user with that email exists or not
    const userFound = await User.find({userEmail : email})
    if(userFound.length == 0) {
        return res.status(404).json({
            message : "User with that email is not registered"
        })
    }
    //password check
    const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)
    if(isMatched) {
        // generate token
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
        })
        
        


        res.status(200).json({
            message : " User logged in successfully ",
            token
        })
    }else{
        res.status(404).json({
            message : "invalid password"
    
        }) 
    }
}

//forget password
exports.forgetPassword = async(req,res) => {
    const {email} = req.body
    if(!email) {
        return res.status(400).json({
            message : "please enter email "
        })

    }
    //check if that email is registered or not
    const userExist = await User.find({userEmail : email})
    if(userExist.length == 0){
        return res.status(404).json({
            message : "email is not registered"
        })
    }

    // send otp to registered email
    const otp = Math.floor(Math.random() * 10000) // 4 digit otp generated
    // to save otp in database(in otp column) so that we can use it to verify 
    userExist[0].otp = otp
    await userExist[0].save()

    await sendEmail({
        email : email, // otp received in this email
        subject : "OTP for your momo account",
        message : `This is your otp.\n ${otp} \nDon't share it with anyone`
     }) 
     res.json({
        message : "OTP sent successfully"
     })
 
}

//verify otp
exports.verifyotp = async(req,res) => {
    const {email,otp} = req.body
    if(!email || !otp) {
        return res.status(400).json({
            message : "Please provide otp"
        })
    }
    //Check the otp is correct or not
    const userExists = await User.find({userEmail : email})
    if(userExists.length == 0) {
        return res.status(404).json({
            message : "Email is not registered"
        })
    }
    if(userExists[0].otp !== otp){
        res.status(400).json({
            message : "Invalid otp"
        })
    }else{
        // disposr the otpso that it cannot be used for next time
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()
        res.status(200).json({
            message : "Otp is correct"
        })
    }


}

//set new password
exports.resetPassword = async(req,res) => {
    const{email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide email, newpassword and confirmpassword"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "NewPassword and confirmPassword doesn't match"
        })
    }

    const userExist = await User.find({userEmail : email})
    if(userExist.length == 0){
        return res.status(404).json({
            message : "User email not registered"
        })

    }
    if(userExist[0].isOtpVerified !== true){
        return res.status(403).json({
            message : "You cannot perform this action"
        })
    }


    userExist[0].userPassword = bcrypt.hashSync(newPassword,10)
    userExist[0].isOtpVerified = false
    await userExist[0].save()

    res.status(200).json({
        message : "password changed successfully"
    })

}