"use server";

import { auth } from "@/lib/auth";
import { Hotels } from "@/lib/models/hotel";
import { connectToDatabase } from "@/lib/mongodb";
import { headers } from "next/headers";

export async function getAllHotels() {
  // check session availability here to restrict access to this function
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) throw new Error("Unauthorized");
  await connectToDatabase();

  const hotels = await Hotels.find().lean();
  return JSON.parse(JSON.stringify(hotels));
}
