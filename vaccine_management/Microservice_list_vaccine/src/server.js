// server.js
import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Configuración de CORS
const allowedOrigins = ['http://18.212.65.16'];  // Tu IP del frontend (debería ser un origen completo, incluyendo el protocolo HTTP)

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],  // Asegúrate de incluir Authorization si es necesario
  credentials: true,
};

app.use(cors(corsOptions));  // Aplica CORS

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);  // Asegúrate de que '/api/vaccines' esté bien configurado

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
