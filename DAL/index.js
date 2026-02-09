"use server";
import { auth } from "@/lib/auth";
import { Bookings } from "@/lib/models/bookings";
import { Hotels } from "@/lib/models/hotel";
import { Ratings } from "@/lib/models/rating";
import { Reviews } from "@/lib/models/review";
import { connectToDatabase } from "@/lib/mongodb";
import { isDateInBetween } from "@/utils";
import { headers } from "next/headers";

const checkAuth = async () => {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) throw new Error("Unauthorized");
};

export async function getAllHotels(destination, checkin, checkout) {
  await checkAuth();
  await connectToDatabase();

  console.log(checkin, checkout);

  let query = {};
  const regex = new RegExp(destination, "i");
  if (destination) {
    query.city = { $regex: regex };
  }
  // if (checkin && checkout) {
  //   query.checkin = { $lte: new Date(checkin) };
  //   query.checkout = { $gte: new Date(checkout) };
  // }

  const hotels = await Hotels.find(query)
    .select(["thumbNailUrl", "name", "highRate", "lowRate", "city", "propertyCategory"])
    .lean();

  let allHotels = hotels;

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const foundBookings = await findBookings(hotel._id, checkin, checkout);
        if (foundBookings) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      }),
    );
  }

  return JSON.parse(JSON.stringify(allHotels));
}

async function findBookings(hotelId, checkin, checkout) {
  const bookings = await Bookings.find({ hotelId }).lean();

  const found = bookings.find((booking) => {
    return (
      isDateInBetween(checkin, booking.checkin, booking.checkout) ||
      isDateInBetween(checkout, booking.checkin, booking.checkout)
    );
  });
  return found;
}

export async function getHotelById(id, checkin, checkout) {
  await checkAuth();
  await connectToDatabase();

  const hotel = await Hotels.findById(id).lean();
  if (checkin && checkout) {
    const foundBookings = await findBookings(id, checkin, checkout);
    if (foundBookings) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
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
