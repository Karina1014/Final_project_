import express from "express";
import cors from "cors";
import connectDB from './config/mongodb.js'; // Conexión a la base de datos
import 'dotenv/config';
import path from 'path';
import dogRouter from "./routes/dogRouter.js";

// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Configuración para servir archivos estáticos (como imágenes subidas)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/dogs", dogRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API Working");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
