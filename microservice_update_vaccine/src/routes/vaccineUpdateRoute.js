import express from 'express';
import * as vaccineUpdateController from '../controllers/vaccineUpdateController.js';

const router = express.Router();

router.put('/updateVaccines', vaccineUpdateController.updateVaccine);  

export default router;
