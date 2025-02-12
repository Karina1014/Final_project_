import express from "express";
import cors from "cors";
import { connectDB } from './config/mysqldb.js';
import 'dotenv/config';
import dogRouter from "./routes/dogRouter.js";

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 4002;

connectDB();
// Configuración de CORS
const allowedOrigins = ['http://52.91.76.250'];  // Tu IP del frontend (debería ser un origen completo, incluyendo el protocolo HTTP)

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica CORS

// Routes
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dog", dogRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

