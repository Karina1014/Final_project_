import express from 'express';
import { updateVaccine } from '../controllers/updateVaccine.js';

const router = express.Router();

router.put('/updateVaccine/:id', updateVaccine);

export default router;