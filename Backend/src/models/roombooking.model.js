import mongoose, { Schema } from 'mongoose';

const roomBookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
      required: true
    },
    guests: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled', 'completed'],
      default: 'booked'
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);
