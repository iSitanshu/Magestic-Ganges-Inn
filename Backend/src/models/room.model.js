import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true
    },
    roomType: {
      type: String,
      enum: ['Single', 'Double', 'Deluxe', 'Suite'],
      required: true
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    amenities: {
      type: [String],
      default: []
    },
    offers: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export const Room = mongoose.model('Room', roomSchema);
