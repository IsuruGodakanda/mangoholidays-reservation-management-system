import asyncHandler from 'express-async-handler';
import RoomRate from '../models/roomRateModel.js';

// @desc    All rates
// @route   GET /api/roomrates/:board_id/:size_id
// @access  Public
export const getRoomRate = asyncHandler(async (req, res) => {
  const roomRate = await RoomRate.findOne({
    room_board_type: req.params.board_id,
    room_size_type: req.params.size_id
  });

  res.json({ rate: roomRate.rate });
});
