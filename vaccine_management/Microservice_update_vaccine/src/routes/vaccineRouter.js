import express from 'express';
import * as vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.put('/updateVaccines', vaccineController.updateVaccine);  

export default router;
