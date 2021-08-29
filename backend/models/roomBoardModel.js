import mongoose from 'mongoose';

const roomBoardSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  }
});

const RoomBoard = mongoose.model('RoomBoard', roomBoardSchema);

export default RoomBoard;
