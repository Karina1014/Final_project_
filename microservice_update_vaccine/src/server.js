import express from 'express';
import vaccineUpdateRoute from './routes/vaccineRouter.js';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3000;

// Configuration cors - Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['*']); 
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineUpdateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



