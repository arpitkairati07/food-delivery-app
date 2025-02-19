import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        
        const requestData = Object.fromEntries(
            Object.entries(req.body).map(([key, value]) => [key.trim(), value])
        );

        const { name, description, price, category } = requestData;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const priceValue = Number(price);
        if (isNaN(priceValue) || priceValue <= 0) {
            return res.status(400).json({ success: false, message: "Invalid price. Must be a positive number." });
        }

        let image_filename = req.file ? req.file.filename : "default.jpg"; 

        const food = new foodModel({
            name,
            description,
            price: priceValue,  
            image: image_filename,
            category
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.error("Error in addFood:", error);
        res.status(500).json({ success: false, message: "Error adding food item", error });
    }
};


// Fetch all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error in listFood:", error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
};


const removeFood = async (req, res) => {
    try {
        const { id } = req.params;  // ✅ Get ID from URL parameters
        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the food image file if it exists
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error("Error deleting image:", err);
        });

        await foodModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};


export { addFood, listFood, removeFood};
