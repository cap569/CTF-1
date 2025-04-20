/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGO_URL = process.env.DATABASE_URL as string;

if (!MONGO_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

// Global cache para evitar múltiplas conexões em dev e serverless
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      // options opcionais (se quiser setar)
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
