import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Guest Schema
const guestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER']
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Compare password between plain get from guest and hashed
guestSchema.methods.matchPassword = async function (enteredPassword) {
  return (await this.password) ? bcrypt.compare(enteredPassword, this.password) : false;
};

guestSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  // Generate Salt
  const salt = await bcrypt.genSalt(10);

  // Encrypt Password
  this.password = await bcrypt.hash(this.password, salt);
});

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
