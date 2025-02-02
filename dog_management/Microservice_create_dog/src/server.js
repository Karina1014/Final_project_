import express from "express";
import cors from "cors";
import { connectDB } from './config/mysqldb.js';
import 'dotenv/config';
import dogRouter from "./routes/dogRouter.js";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dogs", dogRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
