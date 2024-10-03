const mongoose = require("mongoose")
const User = require("../model/userModel")
const adminSeeder = require("../adminSeeder")


exports.connectDatabase = async()=>{
    
// connecting to DB
await mongoose.connect(process.env.MONGO_URI)

// await =  wait till connected to databases
console.log("database connected successfully")
    

adminSeeder()





}