const express = require('express')
const mongoose = requrie('mongoose')

app.get("/",(req,res)=>{
    
})

app.get("/home",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })
    
})


app.get("/home/:id",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })
    
})

app.listen(2000,()=>{
    console.log("successful")
})
