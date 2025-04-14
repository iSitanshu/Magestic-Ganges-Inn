import mongoose, { Schema } from 'mongoose';

const restaurantBookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    guests: {
      type: Number,
      required: true
    },
    seats: {
      type: Number,
      required: true
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

export const RestaurantBooking = mongoose.model('RestaurantBooking', restaurantBookingSchema);
