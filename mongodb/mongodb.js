import mongoose from "mongoose";
//import varible from .env file
import { MONGODB_URI, PORT } from "../config/env.js";

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
