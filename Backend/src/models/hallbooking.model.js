import mongoose, { Schema } from 'mongoose';

const hallBookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    Method: {
      type: String,
      enum: ['Online', 'Offline'],
      default: 'Online'
    },
    bookingDate: {
      type: Date,
      required: true
    },
    timeSlot: {
      type: String,
      enum: ['Morning', 'Lunch', 'Evening', 'Night'],
      required: true
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
