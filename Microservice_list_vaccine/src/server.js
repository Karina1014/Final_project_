import express from 'express';
import cors from 'cors';
import vaccineRoute from './routes/vaccineRouter.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', vaccineRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 



