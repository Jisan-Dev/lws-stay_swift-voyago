import { Hotels } from "@/lib/models/hotel";
import { connectToDatabase } from "@/lib/mongodb";

export async function getAllHotels() {
  await connectToDatabase();

  const hotels = await Hotels.find().lean();
  return JSON.parse(JSON.stringify(hotels));
}
