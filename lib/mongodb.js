import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedConnection = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    console.log("[DATABASE IS ALREADY CONNECTED!]");
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

    cachedConnection = conn.connection;
    console.log("[DATABASE CONNECTED SUCCESSFULLY!]");
    return cachedConnection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
