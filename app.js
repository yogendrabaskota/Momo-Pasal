const express = require('express')
const mongoose = requrie('mongoose')

app.get("/",(req,res)=>{  
})
app.get("/home",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })  
})
app.patch("/home/:id",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })  
})
app.get("/home/:id",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })
})


app.post("/home/:id",(req,res)=>{
    res.status(200).json({
        message : "successfuly showing"
    })  
})

app.listen(3000,()=>{
    console.log("successfulLy")
})

