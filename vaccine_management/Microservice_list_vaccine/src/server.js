import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Configuración de CORS
const allowedOrigins = ['http://34.227.117.50'];  // IP o URL del frontend (asegúrate de que sea correcto)

const corsOptions = {
  origin: allowedOrigins, // Permitir solo tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permitir el manejo de credenciales
};

app.use(cors(corsOptions));  // Aplica CORS a todas las rutas

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);  // Asegúrate de que '/api/vaccines' esté correctamente configurado

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
