import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'

dotenv.config();
// App config
const app= express()
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())


// Database Connection 
connectDB();

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(PORT,()=>{
    console.log(`Server started on localhost:${PORT}`)
})
