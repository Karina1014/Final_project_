import express from 'express';
import cors from 'cors';
import vaccineRouter from './routes/vaccineRouter.js';

const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', vaccineRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



