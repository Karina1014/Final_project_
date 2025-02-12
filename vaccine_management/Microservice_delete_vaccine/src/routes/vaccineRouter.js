import express from 'express';
import * as vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.delete('/deleteVaccine/:id_vaccine', vaccineController.deleteVaccine);

export default router;

