import express from 'express';
import cors from 'cors';
import vaccineRouter from './routes/vaccineRouter.js';
import cors from "cors";
const app = express();

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3003;

// Configuración de CORS
const allowedOrigins = ['http://3.80.157.117'];  // Tu IP del frontend (debería ser un origen completo, incluyendo el protocolo HTTP)

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica CORS

app.use(cors());
app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



