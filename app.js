const express = require('express')
const { connectDatabase } = require('./Database/database')
const app = express()

// tell node to use dotenv
require("dotenv").config()

//Routes 
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")

//end routes

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//telling nodejs to give access to the uploads folder 
app.use(express.static("uploads"))

//database connection 
connectDatabase()

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})


app.use("",authRoute)
app.use("",productRoute)


//register user api
//app.post("/register",registerUser)

//login user api
//app.post("/login",loginUser)





// listen server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})

