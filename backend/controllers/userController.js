import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";

// Login 
const loginUser = async (req, res) => {

}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"3d"})
}
// Registered USer
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        // Validating Password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid mail id" });
        }
        if(password.length < 8){
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
       // Encrypting the password
       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await userModel.create({ name : name, email:email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, message: "User registered successfully", user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};


export { loginUser, registerUser }
