import { check } from 'express-validator';

// All validation for AUTH controller

export const validRegister = [
  check('name', 'Name is required')
    .notEmpty()
    .isLength({
      min: 4,
      max: 32
    })
    .withMessage('name must be between 3 to 32 characters'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password', 'Password is required')
    .notEmpty()
    .isLength({
      min: 8,
      max: 32
    })
    .withMessage('name must be between 8 to 32 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Must be a valid password'),
  check('gender', 'Gender is required').notEmpty(),
  check('phone', 'Phone number required').notEmpty()
];

export const validLogin = [
  check('email', 'Must be a valid email address').isEmail(),
  check('password', 'Password is required').exists()
];

// All validation for RESERVATION controller

export const validMakeReservation = [
  check('reserved_property', 'Property id is required').notEmpty(),
  check('number_of_rooms', 'Required number of rooms is required').notEmpty(),
  check('room_board_type', 'Room boarding type is required').notEmpty(),
  check('room_size_type', 'Room size is required').notEmpty(),
  check('from_date', 'From date is required').notEmpty(),
  check('to_date', 'To date is required').notEmpty(),
  check('total_price', 'Total price is required').notEmpty()
];

export const validUpdatePaymentMethod = [check('payment_method', 'Payment method is required').notEmpty()];
