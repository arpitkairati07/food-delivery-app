import { data } from "react-router-dom";
import foodModel from "../models/foodModel.js";
import fs from 'fs'


// const food item 
const addFood = async(req,res) =>{

    let image_filename = `${req.file.filename}`;
    
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });

try {
    await food.save();
    res.json({success:true,message:"Food item added successfully"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error adding food item"})
}
}

// all FoodList 
const listFood = async (req,res) =>{
    try {
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error fetching food list"})
    }
}

export {addFood,listFood}