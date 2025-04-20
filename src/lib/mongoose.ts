import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
