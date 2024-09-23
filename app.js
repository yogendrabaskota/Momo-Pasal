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
    
})

//login user api
app.post("/login",async(req,res)=>{
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
        res.status(200).json({
            message : " User logged in successfully "
        })
    }else{
        res.status(404).json({
            message : "invalid password"
    
        }) 
    }


})


// listen server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})

