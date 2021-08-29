import express from 'express';
const router = express.Router();

import { validMakeReservation, validUpdatePaymentMethod } from '../middleware/validationMiddleware.js';

import {
  makeReservation,
  updatePaymentMethod,
  updateReservationCancelStatus,
  getAuthReservations
} from '../controllers/reservationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, validMakeReservation, makeReservation);

router.get('/auth', protect, getAuthReservations);

router.put('/:id/setpaymentmethod', protect, validUpdatePaymentMethod, updatePaymentMethod);

router.put('/:id/cancel', protect, updateReservationCancelStatus);

export default router;
