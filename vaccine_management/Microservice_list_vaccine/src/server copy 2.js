import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  // Importa cookieParser
import vaccineRouter from './routes/vaccineRouter.js';

const app = express();
const PORT = 3002;

// Define los orígenes permitidos para CORS
const allowedOrigins = ['http://localhost:5173'];  // Si estás trabajando localmente con Vite

// Configuración de CORS
const corsOptions = {
  origin: allowedOrigins,  // Permite solicitudes desde el origen especificado
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',  // Asegúrate de permitir Authorization si usas autenticación
  credentials: true,  // Permite el envío de cookies y credenciales
};

app.use(cors(corsOptions));

// Middleware para procesar cookies
app.use(cookieParser());  // Permite analizar cookies

// Middleware para procesar JSON
app.use(express.json());

// Rutas de vacunas
app.use('/api', vaccineRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
