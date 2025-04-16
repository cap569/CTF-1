import mongoose from "mongoose";

// @TODO: This makes multiple connections every request
// we should fix this to avoid redundancy.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
