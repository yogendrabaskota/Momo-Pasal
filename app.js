const express = require('express')
const { connectDatabase } = require('./Database/database')
const app = express()


require("dotenv").config()

//Routes 
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/userProfileRoute")
const cartRoute = require("./routes/user/cart/cartController")
const orderRoute = require("./routes/user/order/orderRoute")

//end routes


app.use(express.json())
app.use(express.urlencoded({extended : true}))

//telling nodejs to give access to the uploads folder 
app.use(express.static("uploads"))


connectDatabase()

app.get("/",(req,res)=>{  
    res.status(200).json({
    message : "I am here"
    })
})


app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/admin",adminOrderRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)


//register user api
//app.post("/register",registerUser)

//login user api
//app.post("/login",loginUser)





// listen server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})

