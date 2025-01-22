import express from 'express';
import * as vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.get('/vaccines', vaccineController.getVaccines);

export default router;