import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from "cors";
import { connectDB } from './config/postgredb.js';

const app = express();

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3001;

connectDB();

// Configuración de CORS
const allowedOrigins = ['http://34.227.117.50'];  // Tu IP del frontend (debería ser un origen completo, incluyendo el protocolo HTTP)

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica CORS

app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



