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

const allowedOrigins = ['http://localhost:5173'];  // Si estás trabajando localmente con Vite


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // Permitir cualquier origen


app.use(express.json());

// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineUpdateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



