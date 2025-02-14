import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dogRouter from "./routes/dogRouter.js";
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 4002;

const corsOptions = {
  origin: "http://localhost:5173", // Permitir peticiones solo desde el frontend
  credentials: true, // **IMPORTANTE** Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies-prove

app.use(express.json());

// Routes
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/dogs", dogRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

