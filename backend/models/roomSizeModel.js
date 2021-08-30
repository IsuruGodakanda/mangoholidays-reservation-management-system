import mongoose from 'mongoose';

const roomSizeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  }
});

const RoomSize = mongoose.model('RoomSize', roomSizeSchema);

export default RoomSize;
