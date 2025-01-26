import express from 'express';
import cors from 'cors';
import vaccineRouter from './routes/vaccineRouter.js';

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3003;

// Configuration cors - Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['*']); 
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});


app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



