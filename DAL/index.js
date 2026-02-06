import { auth } from "@/lib/auth";
import { Hotels } from "@/lib/models/hotel";
import { Ratings } from "@/lib/models/rating";
import { Reviews } from "@/lib/models/review";
import { connectToDatabase } from "@/lib/mongodb";
import { headers } from "next/headers";

const checkAuth = async () => {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) throw new Error("Unauthorized");
};

export async function getAllHotels() {
  await checkAuth();
  await connectToDatabase();

  const hotels = await Hotels.find()
    .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
    .lean();
  return JSON.parse(JSON.stringify(hotels));
}

export async function getHotelById(id) {
  await checkAuth();
  await connectToDatabase();

  const hotel = await Hotels.findById(id).lean();
  return JSON.parse(JSON.stringify(hotel));
}

export async function getRatings(hotelId) {
  await checkAuth();
  await connectToDatabase();

  const ratings = await Ratings.find({ hotelId }).lean();
  return JSON.parse(JSON.stringify(ratings));
}

export async function getReviews(hotelId) {
  await checkAuth();
  await connectToDatabase();

  const reviews = await Reviews.findById(hotelId).lean();
  return JSON.parse(JSON.stringify(reviews));
}

export async function getReviewsCount(hotelId) {
  await checkAuth();
  await connectToDatabase();

  const reviewsCount = await Reviews.countDocuments({ hotelId });
  return reviewsCount;
}
