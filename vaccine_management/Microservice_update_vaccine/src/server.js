import express from 'express';
import vaccineUpdateRoute from './routes/vaccineRouter.js';
import dotenv from 'dotenv';
import { connectDB } from './config/postgredb.js';
import cors from "cors";

const app = express();

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3004;
connectDB();
const corsOptions = {
  origin: ['http://54.165.181.30'],  // El origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  // No es necesario credentials: true si no usas cookies o autenticación
};

app.use(cors(corsOptions)); // Aplica CORS sin credenciales

app.use(cors(corsOptions)); // Aplica CORS

app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineUpdateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



