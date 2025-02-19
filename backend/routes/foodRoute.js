import express from "express";
import multer from "multer";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";

// Image Storage Engine
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({
    storage: Storage,
});

const foodRouter = express.Router();

// Define the route after the upload is initialized
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.delete("/remove/:id", removeFood);

export default foodRouter;
