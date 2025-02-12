import express from 'express';
import cors from 'cors';
import vaccineRouter from './routes/vaccineRouter.js';


const app = express();
const PORT = 3002;

const allowedOrigins = ['http://localhost:5173'];  // Si estás trabajando localmente con Vite


app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true })); // Permitir cualquier origen

// Rutas de vacunas
app.use('/api', vaccineRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
