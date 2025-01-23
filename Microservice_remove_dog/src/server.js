import express from "express";
import cors from "cors";
import connectDB from './config/mongodb.js'; // Conexión a la base de datos
import dogRouter from "./routes/dogRouter.js";
import 'dotenv/config';
import path from 'path';

// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(express.json());
app.use(cors());

// Configuración para servir archivos estáticos (como imágenes subidas)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));  // Asegúrate de que esta línea esté correcta

// Conectar a la base de datos
connectDB();

//api endpoint
app.use("/api/dogs", dogRouter);
//api endpoint
app.use("/images",express.static('uploads'))
// Ruta raíz
app.get("/", (req, res) => {
  res.send("API Working");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
