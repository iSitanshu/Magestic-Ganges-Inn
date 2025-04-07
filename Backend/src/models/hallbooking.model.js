import mongoose, { Schema } from 'mongoose';

const hallBookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    hallId: {
      type: Schema.Types.ObjectId,
      ref: 'Hall',
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    bookingSource: {
      type: String,
      enum: ['Online', 'Offline'],
      default: 'Online'
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked'
    }
  },
  { timestamps: true }
);

export const HallBooking = mongoose.model('HallBooking', hallBookingSchema);
