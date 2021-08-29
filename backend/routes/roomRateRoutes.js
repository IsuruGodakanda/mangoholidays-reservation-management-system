import express from 'express';
const router = express.Router();
import { getRoomRate } from '../controllers/roomRateController.js';

router.get('/:board_id/:size_id', getRoomRate);

export default router;
