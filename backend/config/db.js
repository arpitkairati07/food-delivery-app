import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://arpitkairati2002:1234@cluster0.zn8bz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Database connected successfully ...."))
    .catch(err => console.error("Database connection error" ,err));
};

