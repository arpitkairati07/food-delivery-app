import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        // Remove useNewUrlParser and useUnifiedTopology options
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connection successful");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Stop the app if the connection fails
    }
};

export default connectDB;
