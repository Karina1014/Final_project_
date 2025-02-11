import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Configuración de CORS
const allowedOrigins = ['http://34.227.117.50'];  // Asegúrate de agregar todas las IPs necesarias para tu frontend

const corsOptions = {
  origin: allowedOrigins,  // Permitir sólo las URLs del frontend específicas
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Permite el manejo de credenciales (cookies, sesiones, etc.)
};

app.use(cors(corsOptions));  // Aplica CORS a todas las rutas

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);  // Asegúrate de que '/api/vaccines' esté bien configurado en tu enrutador

// Manejo de solicitudes OPTIONS
app.options('*', cors(corsOptions));  // Permite el manejo de las solicitudes preflight OPTIONS (esto es importante para las solicitudes con credenciales)

// Verifica que el servidor esté corriendo
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
