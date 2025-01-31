import express from "express";
import multer from "multer"; // Importing multer
import { addDog } from "../controllers/dogController.js"; // Make sure the path is correct

const dogRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

dogRouter.post("/add", upload.single("image"), addDog);

export default dogRouter;
