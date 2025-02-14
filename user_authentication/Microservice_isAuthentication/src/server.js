import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; // Asegúrate del nombre del archivo
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import morgan from 'morgan'

const app = express();
const port = 6005;

connectDB();

const corsOptions = {
  origin: "http://54.147.184.127", // Permitir peticiones solo desde el frontend
  credentials: true, // **IMPORTANTE** Permitir envío de cookies
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cookieParser()); // Mueve esto antes de cors()
app.use(express.json()); 
app.use(cors(corsOptions)); // cors después de cookieParser()
app.use(morgan('dev'));

// Middleware para depuración: Ver las cookies que llegan al servidor
app.use((req, res, next) => {
  console.log("Cookies recibidas:", req.cookies);
  next();
});

app.use(express.json());
// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
  });

app.listen(port, () => console.log(`Server started on PORT:${port}`));
