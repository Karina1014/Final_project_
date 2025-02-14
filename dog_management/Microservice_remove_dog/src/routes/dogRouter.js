import express from 'express';
import * as dogController from '../controllers/dogController.js';

const router = express.Router();

// Asegúrate de que la ruta esté bien definida
router.delete('/deleteDog/:id', dogController.deleteDog);

export default router;
