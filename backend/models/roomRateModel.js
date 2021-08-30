import mongoose from 'mongoose';

const roomRateSchema = mongoose.Schema({
  room_board_type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RoomBoard'
  },
  room_size_type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RoomSize'
  },
  rate: {
    type: Number,
    required: true
  }
});

const RoomRate = mongoose.model('RoomRate', roomRateSchema);

export default RoomRate;
