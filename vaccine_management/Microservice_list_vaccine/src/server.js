import express from 'express';
import cors from 'cors';
import vaccineRoute from './routes/vaccineRouter.js';
import { connectDB } from './config/postgredb.js';

const app = express();
const PORT = 3002;

connectDB();
// Configuración de CORS
const allowedOrigins = ['http://52.91.76.250']; 
// Configuración de CORS
const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
// Aplica el middleware de CORS
app.use(cors(corsOptions)); // Aplica CORS

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
