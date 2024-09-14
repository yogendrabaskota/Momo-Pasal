const express = require('express')
const { connectDatabase } = require('./Database/database')
const User = require('./model/userModel')

const app = express()

// tell node to use dotenv
require("dotenv").config()
const bcrypt = require("bcryptjs")


app.use(express.json())
app.use(express.urlencoded({extended : true}))

//database connection 
connectDatabase()

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})

//register user api
app.post("/register",async(req,res)=>{
     const {email,password,phoneNumber,username} = req.body
     if(!email || !password || !phoneNumber || !username) {
        res.status(400).json({
            message : "please provide email,password,phoneNumber"
        })
    }
   await User.create({ //creating database collection
        userName : username,
        userPhoneNumber : phoneNumber,
        userEmail : email,
        userPassword : bcrypt.hashSync(password,10)
    })
    res.status(201).json({
        message : "User registered successfully"
    })
})



// listen server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})

