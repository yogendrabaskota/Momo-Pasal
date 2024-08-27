const express = require('express')
//const mongoose = require('mongoose')
const app = express()

app.get("/",(req,res)=>{  
res.status(200).json({
    
    message : "I am here"
})
})



// listen server
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})

