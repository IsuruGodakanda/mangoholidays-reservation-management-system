import express from 'express';
const router = express.Router();
import { listRoomBoardTypes } from '../controllers/roomBoardController.js';

router.get('/', listRoomBoardTypes);

export default router;
