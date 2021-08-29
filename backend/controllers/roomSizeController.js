import asyncHandler from 'express-async-handler';
import RoomSize from '../models/roomSizeModel.js';

// @desc    All sizes
// @route   GET /api/roomsizes
// @access  Public
export const listRoomSizeTypes = asyncHandler(async (req, res) => {
  let roomsizes = [];

  roomsizes = await RoomSize.find();

  res.json({ results: roomsizes });
});
