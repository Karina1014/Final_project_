import express from 'express';
import cors from 'cors';
import vaccineRoute from './routes/vaccineRouter.js';
import { connectDB } from './config/postgredb.js';

const app = express();
const PORT = 3002;

connectDB();

// Configuración de CORS
const corsOptions = {
  origin: 'http://34.227.117.50',  // Permite solo este origen
  credentials: true,  // Permite el envío de cookies y autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type'],  // Cabeceras permitidas
};

// Aplica el middleware de CORS
app.use(cors(corsOptions));  // Aplica CORS antes de las rutas

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);

// Middleware adicional para asegurar que las cabeceras CORS estén presentes en cada respuesta
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://34.227.117.50'); // Asegura que se permita el origen correcto
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
