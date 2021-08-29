import express from 'express';
const router = express.Router();

import { getGuestProfile } from '../controllers/guestController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/profile', protect, getGuestProfile);

export default router;
