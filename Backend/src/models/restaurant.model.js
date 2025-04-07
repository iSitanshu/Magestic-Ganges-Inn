import mongoose, { Schema } from 'mongoose';

const restaurantTableSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true
    },
    seats: {
      type: Number,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    section: {
      type: String,
      enum: ['Morning', 'Evening', 'Night'],
      required: true
    }
  },
  { timestamps: true }
);

export const RestaurantTable = mongoose.model('RestaurantTable', restaurantTableSchema);
