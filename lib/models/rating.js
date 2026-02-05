import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  rating: {
    required: true,
    type: Number,
  },
});

export const Ratings = mongoose.models.ratings ?? mongoose.model("ratings", ratingSchema);
