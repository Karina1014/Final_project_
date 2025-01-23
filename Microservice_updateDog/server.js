import express from "express";
import cors from "cors";
import connectDB from './config/mongodb.js'; // Conexión a la base de datos
import dogRouter from "./routes/dogRouter.js";
import 'dotenv/config';
import path from 'path';

// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 4003;

// Middleware
app.use(express.json()); // Soporte para JSON en las solicitudes
app.use(cors()); // Habilitar CORS para todas las solicitudes

// Configuración para servir archivos estáticos (como imágenes subidas)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Conectar a la base de datos
connectDB().then(() => {
  console.log("✅ Conexión a la base de datos exitosa");
}).catch((error) => {
  console.error("❌ Error al conectar la base de datos:", error.message);
  process.exit(1); // Detener la aplicación si la conexión falla
});

// Configuración de rutas
app.use("/api/dogs", dogRouter);

// Ruta para probar la API
app.get("/", (req, res) => {
  res.send("API Working");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
