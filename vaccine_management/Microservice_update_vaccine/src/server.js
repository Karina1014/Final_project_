import express from 'express';
import vaccineUpdateRoute from './routes/vaccineRouter.js';
import dotenv from 'dotenv';
dotenv.config(); 
import cors from "cors";

const app = express();

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3004;

const corsOptions = {
  origin: ['http://34.227.117.50', 'http://54.167.144.194'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions)); // Aplica CORS

app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineUpdateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



