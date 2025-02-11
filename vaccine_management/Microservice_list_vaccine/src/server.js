import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Configuración simple de CORS para permitir solo una IP específica
const corsOptions = {
  origin: 'http://34.227.117.50',  // Permite solicitudes solo desde esta IP
  credentials: true,  // Permite el uso de credenciales como cookies
};

app.use(cors(corsOptions));  // Aplica la configuración de CORS

// Middleware para procesar JSON
app.use(express.json());

// Rutas de la API
app.use('/api', vaccineRoute);  // Asegúrate de que '/api/vaccines' esté bien configurado

// Inicia el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
