import asyncHandler from 'express-async-handler';
import Guest from '../models/guestModel.js';

// @desc    Get user profile
// @route   GET /api/guests/profile
// @access  Private
export const getGuestProfile = asyncHandler(async (req, res) => {
  const guest = await Guest.findById(req.guest._id);

  if (guest) {
    res.json({
      _id: guest._id,
      name: guest.name,
      email: guest.email,
      gender: guest.gender,
      phone: guest.phone
    });
  } else {
    res.status(404);
    throw new Error('Guest not found');
  }
});
