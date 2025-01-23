import express from "express";
import cors from "cors";
import connectDB from './config/mongodb.js'; 
import dogRouter from "./routes/dogRouter.js";
import 'dotenv/config';
import path from 'path';

// Application settings
const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Configuration for serving static files (such as uploaded images)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); 

connectDB();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dogs", dogRouter);
app.use("/images",express.static('uploads'))
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
