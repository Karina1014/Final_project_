import express from "express";
import multer from "multer";
import { dogController } from "../controllers/dogController.js";

const dogRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dogRouter.post("/add", upload.single("image"), (req, res) => dogController.addDog(req, res));

export default dogRouter;
