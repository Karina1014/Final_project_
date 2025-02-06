import express from 'express';
import vaccineRoute from './routes/vaccineRouter.js';
import cors from "cors";
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3002;

const allowedOrigins = ['http://localhost:5173'];  
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true })); 


// Configuration cors - Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['*']); 
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



