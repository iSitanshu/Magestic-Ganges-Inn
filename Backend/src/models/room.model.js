import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    room_no: {
      type: String,
      required: true
    },
    seat: {
      type: Number,
      reuired: true
    },
    balcony: {
      type: Boolean,
      required: true
    },
    pricePerNight: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }
);

export const Room = mongoose.model('Room', roomSchema);
