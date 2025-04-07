import mongoose, { Schema } from 'mongoose';

const hallSchema = new Schema(
  {
    hallName: {
      type: String,
      required: true,
      unique: true
    },
    capacity: {
      type: Number,
      required: true
    },
    pricePerHour: {
      type: Number,
      required: true
    },
    offers: {
      type: [String],
      default: []
    },
    amenities: {
      type: [String],
      default: []
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Hall = mongoose.model('Hall', hallSchema);
