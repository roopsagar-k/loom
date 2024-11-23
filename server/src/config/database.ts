import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loom";
    await mongoose.connect(MONGO_URI);
    console.log("🌱 MongoDB connected successfully! 🎉");
  } catch (error) {
    console.error('❌ MongoDB connection failed: ', error);
    process.exit(1);
  }
};

export default connectDB;
