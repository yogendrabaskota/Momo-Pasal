const mongoose = require("mongoose")
const User = require("../model/userModel")


exports.connectDatabase = async()=>{
    
// connecting to DB
await mongoose.connect(process.env.MONGO_URI)

// await =  wait till connected to databases
console.log("database connected successfully")
    

// admin seeding

//check whether the admin exists or not 
const isAdminExists = await User.findOne({userEmail : "admin@gmail.com"})
if(!isAdminExists){
    await User.create({
        userEmail : "admin@gmail.com",
        userPassword : "admin",
        userPhoneNumber : "9090",
        userName : "admin",
        role : "admin"
    })
    console.log("Admin seeded successfully")

}else{
    console.log("Admin already seeded")
}





}