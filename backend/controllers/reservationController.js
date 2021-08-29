import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import Reservation from '../models/reservationModel.js';
import sgMail from '@sendgrid/mail';
import { reservationConfirmationEmailTemplate } from '../utils/emailTemplates.js';
import { isEqual } from 'lodash-es';

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
export const makeReservation = asyncHandler(async (req, res) => {
  const {
    reserved_property,
    from_date,
    to_date,
    number_of_rooms,
    room_board_type,
    room_size_type,
    special_note,
    total_price
  } = req.body;
  const errors = validationResult(req);
  sgMail.setApiKey(process.env.MAIL_KEY);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    res.status(422);
    throw new Error(firstError);
  } else {
    if (!reserved_property) {
      res.status(400);
      throw new Error('No property');
    } else {
      const reservation = new Reservation({
        reservation_ref_id: `${uuidv4()}`,
        reserved_property,
        guest: req.guest._id,
        from_date,
        to_date,
        number_of_rooms,
        room_board_type,
        room_size_type,
        special_note,
        total_price
      });

      await reservation.save().then(async (createdReservation) => {
        const emailObject = reservationConfirmationEmailTemplate(createdReservation.reservation_ref_id);

        await sgMail.send(emailObject).then(() => {
          res.status(201).json(createdReservation);
        });
      });
    }
  }
});

// @desc    Get logged in user's reservations
// @route   GET /api/reservations/auth?offset=&limit=&sortby=&sortdirection=
// @access  Private
export const getAuthReservations = asyncHandler(async (req, res) => {
  let offset = parseInt(req.query.offset) - 1 || 0;
  let limit = parseInt(req.query.limit) || 5;
  let sortby = req.query.sortby || '';
  let sortdirection = req.query.sortdirection === 'ASC' ? 1 : -1;

  let reservations = [];

  reservations = await Reservation.find(
    {
      guest: req.guest._id
    },
    {}
  )
    .skip(offset * limit)
    .limit(limit)
    .sort(req.query.sortdirection ? { [sortby]: sortdirection } : { $natural: -1 });

  const reservationCount = await Reservation.find(
    {
      guest: req.guest._id
    },
    {}
  ).countDocuments();

  res.json({ results: reservations, totalCount: reservationCount });
});

// @desc    Update reservation payment method
// @route   PUT /api/reservations/:id/setpaymentmethod
// @access  Private
export const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { payment_method } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    res.status(422);
    throw new Error(firstError);
  } else {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.payment_result = {
        guest: req.guest._id,
        payment_method,
        reservation: req.params.id,
        status: 'PAYMENT_METHOD_SET'
      };

      const updatedReservation = await reservation.save();

      res.json({ updatedReservation });
    } else {
      res.status(404);
      throw new Error('Guest not found');
    }
  }
});

// @desc    Update reservation cancel status
// @route   GET /api/reservations/:id/cancel
// @access  Private
export const updateReservationCancelStatus = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (reservation) {
    if (!isEqual(reservation.payment_result.status, 'PAYMENT_CANCELLED')) {
      reservation.isCancelled = !reservation.isCancelled;

      if (reservation.payment_result) {
        reservation.payment_result.status = 'PAYMENT_CANCELLED';
      }

      if (reservation.isCancelled) {
        reservation.cancelled_at = Date.now();
      } else {
        reservation.createdAt = Date.now();
      }

      console.log(reservation.from_date);
      console.log(new Date(new Date().getTime() + 46800000));
      console.log(new Date());
      var hours = Math.abs(new Date(new Date().getTime() + 46800000) - new Date()) / 3600000;
      console.log(hours);

      let lateCharges;
      let message;

      if (hours > 12) {
        lateCharges = 0;
        message = 'Your reservation has been cancelled';
      } else {
        lateCharges = reservation.total_price * 0.2;
        message = `Your reservation has been cancelled. Please note that you have been charge $ ${
          reservation.total_price * 0.2
        } as the cancellation fee`;
      }
      await reservation.save();

      res.json({ message, lateCharges });
    } else {
      res.status(400);
      throw new Error('Reservation is already cancelled');
    }
  } else {
    res.status(404);
    throw new Error('Reservation not found');
  }
});
