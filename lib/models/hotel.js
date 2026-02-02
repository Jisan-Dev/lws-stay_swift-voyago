import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address1: {
    required: true,
    type: String,
  },
  airportCode: {
    required: true,
    type: String,
  },
  city: {
    required: false,
    type: String,
  },
  countryCode: {
    required: false,
    type: String,
  },
  highRate: {
    required: false,
    type: Number,
  },
  lowRate: {
    required: false,
    type: Number,
  },
  propertyCategory: {
    required: false,
    type: Number,
  },
  stateProvinceCode: {
    required: false,
    type: String,
  },
  thumbNailUrl: {
    required: false,
    type: String,
  },
  gallery: {
    required: false,
    type: Array,
  },
  overview: {
    required: false,
    type: String,
  },
  amenities: {
    required: false,
    type: Array,
  },
});

export const Hotels = mongoose.models.hotels ?? mongoose.model("hotels", hotelSchema);
