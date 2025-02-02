import express from "express";
import multer from "multer";
import { dogController } from "../controllers/dogController.js";

const dogRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dogRouter.delete("/delete/:id", (req, res) => dogController.deleteDog(req, res));

export default dogRouter;
