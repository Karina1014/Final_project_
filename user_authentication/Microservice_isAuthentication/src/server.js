import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; // Asegúrate del nombre del archivo
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const port = 3015;

connectDB();

const allowedOrigins = ['http://localhost:5173'];  
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); 


// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
  });

app.listen(port, () => console.log(`Server started on PORT:${port}`));
