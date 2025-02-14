import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import vaccineRouter from "./routes/vaccineRouter.js";
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const app = express();
const PORT = 3002;

const corsOptions = {
  origin: "http://54.147.184.127", // Permitir peticiones solo desde el frontend
  credentials: true, // **IMPORTANTE** Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser()); // Middleware para manejar cookies-prove

app.use(express.json());
// Rutas de vacunas
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", vaccineRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
