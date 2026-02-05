import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  review: {
    required: true,
    type: Number,
  },
});

export const Reviews = mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);
