import { checkAuth, findBookings } from "@/DAL";
import { Bookings } from "@/lib/models/bookings";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { hotelId, userId, checkin, checkout } = await request.json();

  try {
    connectToDatabase();
    checkAuth();

    const existingBooking = await findBookings(hotelId, checkin, checkout);

    if (existingBooking) {
      return NextResponse.json({ message: "Booking already exists" }, { status: 400 });
    }

    const payload = {
      hotelId: new mongoose.Types.ObjectId(hotelId),
      userId: new mongoose.Types.ObjectId(userId),
      checkin,
      checkout,
    };

    await Bookings.create(payload);

    return NextResponse.json({ message: "Booking created successfully" }, { status: 201 });
  } catch (error) {
    console.log("Error creating booking", error);
    return new NextResponse("Error creating booking", { status: 500 });
  }
};
