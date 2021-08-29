import mongoose from 'mongoose';

// Payment Schema
const paymentSchema = mongoose.Schema(
  {
    payment_method: {
      type: String,
      enum: ['CARD_LOCATION', 'CARD_ONLINE', 'CASH_LOCATION'],
      required: true
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Guest'
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Reservation'
    },
    status: {
      type: String,
      enum: ['PAYMENT_METHOD_SET', 'PAYMENT_DONE', 'PAYMENT_CANCELLED'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Reservation Schema
const reservationSchema = mongoose.Schema(
  {
    reservation_ref_id: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Guest'
    },
    reserved_property: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Property'
    },
    from_date: {
      type: Date,
      required: true
    },
    to_date: {
      type: Date,
      required: true
    },
    number_of_rooms: {
      type: Number,
      required: true,
      default: 1
    },
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
    payment_result: paymentSchema,
    special_note: {
      type: String
    },
    total_price: {
      type: Number,
      required: true,
      default: 0.0
    },
    is_paid: {
      type: Boolean,
      required: true,
      default: false
    },
    paid_at: {
      type: Date
    },
    is_checked_in: {
      type: Boolean,
      required: true,
      default: false
    },
    checked_in_at: {
      type: Date
    },
    is_checked_out: {
      type: Boolean,
      required: true,
      default: false
    },
    checked_out_at: {
      type: Date
    },
    is_cancelled: {
      type: Boolean,
      required: true,
      default: false
    },
    cancelled_at: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
