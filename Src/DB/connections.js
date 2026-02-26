import mongoose from "mongoose";
import { MONGODB_URI } from "../../Config/config.service.js";
 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
export default connectDB;