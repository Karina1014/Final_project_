import express from "express";
import multer from "multer";
import { dogController } from "../controllers/dogController.js";

const dogRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dogRouter.put("/update/:id", upload.single("image"), (req, res) => dogController.updateDog(req, res));

export default dogRouter;

