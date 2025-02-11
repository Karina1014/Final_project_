// En el archivo de servidor de Express (por ejemplo, `server.js`)
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/postgredb.js';

const app = express();
const PORT = 3002;

connectDB();
// Configuración de CORS
const allowedOrigins = ['http://44.201.85.67']; // Asegúrate de que este sea tu dominio o IP correcta
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,  // Permite enviar cookies de sesión (si es necesario)
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
