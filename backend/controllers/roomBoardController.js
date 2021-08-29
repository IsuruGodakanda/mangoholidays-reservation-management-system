import asyncHandler from 'express-async-handler';
import RoomBoard from '../models/roomBoardModel.js';

// @desc    All boards
// @route   GET /api/roomboards
// @access  Public
export const listRoomBoardTypes = asyncHandler(async (req, res) => {
  let roomBoards = [];

  roomBoards = await RoomBoard.find();

  res.json({ results: roomBoards });
});
