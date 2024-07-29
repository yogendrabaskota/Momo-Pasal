const mongoose = require("mongoose")
exports.connectDatabase = async()=>{
    
// connecting to DB
await mongoose.connect("mongodb+srv://sujanbaskota321:momopasal@cluster0.r5ox8tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// await =  wait till connected to databases
console.log("database connected successfully")
    
}