import express from 'express';
const router = express.Router();
import { getProperties, getPropertyById, getPropertyAvailability } from '../controllers/propertyController.js';

router.get('/', getProperties);

router.get('/:id', getPropertyById);

router.get('/:id/availability', getPropertyAvailability);

export default router;
