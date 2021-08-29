import Guest from '../models/guestModel.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { generateAuthToken } from '../utils/generateToken.js';

// @desc    Register a new guest
// @route   POST /api/auth/register
// @access  Public
export const registerGuest = asyncHandler(async (req, res) => {
  const { name, email, password, gender, phone } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    res.status(422);
    throw new Error(firstError);
  } else {
    const guestExists = await Guest.findOne({ email });

    if (guestExists) {
      res.status(400);
      throw new Error('Email already exists');
    } else {
      await Guest.create({
        name,
        email,
        password,
        gender,
        phone
      }).then(async (guest) => {
        const payload = {
          id: guest.id,
          name: guest.name,
          email: guest.email,
          gender: guest.gender,
          phone: guest.phone
        };

        const token = await generateAuthToken(payload);
        res.json({ token });
      });
    }
  }
});

// @desc    Authenticate guest & get token
// @route   POST /api/auth
// @access  Public
export const loginGuest = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    res.status(422);
    throw new Error(firstError);
  } else {
    const guest = await Guest.findOne({ email });

    if (!guest || !(await guest.matchPassword(password))) {
      res.status(400);
      throw new Error('Invalid Credentials');
    } else {
      const payload = {
        id: guest.id,
        name: guest.name,
        email: guest.email,
        gender: guest.gender,
        phone: guest.phone
      };

      const token = await generateAuthToken(payload);
      res.json({ token });
    }
  }
});
