import express from 'express';
import cors from 'cors';
import vaccineUpdateRoute from './routes/vaccineRouter.js';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', vaccineUpdateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



