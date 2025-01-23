import express from 'express';
import * as vaccineController from '../controllers/vaccineController.js';

const router = express.Router();

router.post('/createVaccines', vaccineController.create);

export default router;