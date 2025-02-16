import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'


// App config
const app= express()
const port=5000

//middleware
app.use(express.json())
app.use(cors())


// Database Connection 
connectDB();

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`Server started on localhost:${port}`)
})


//mongodb+srv://arpitkairati2002:food_delivery@1234@cluster0.m9mbs.mongodb.net/?