import express from "express";
import cors from "cors";
import { connectDB } from './config/mysqldb.js';
import 'dotenv/config';
import dogRouter from "./routes/dogRouter.js";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 4003;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dog", dogRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

