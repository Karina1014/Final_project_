import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Configuración de CORS usando el paquete 'cors'
const corsOptions = {
  origin: 'http://52.206.95.187:80', // Permite solicitudes desde el frontend en este puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeceras permitidas
  credentials: true, // Si estás utilizando cookies o autenticación con credenciales
};

app.use(cors(corsOptions)); // Aplicamos la configuración de CORS a todas las rutas

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
