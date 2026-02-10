import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  hotelId: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "hotels",
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  checkin: {
    required: true,
    type: String,
  },
  checkout: {
    required: true,
    type: String,
  },
});

export const Bookings = mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);
