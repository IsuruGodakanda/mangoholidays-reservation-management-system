import express from 'express';
const router = express.Router();
import { listRoomSizeTypes } from '../controllers/roomSizeController.js';

router.get('/', listRoomSizeTypes);

export default router;
