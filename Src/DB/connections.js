import mongoose from "mongoose";
import chalk from "chalk";
import { MONGODB_URI } from "../../Config/config.service.js";
 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log( chalk.bgGreenBright.white("Connected to MongoDB successfully") );
  } catch (error) {
    console.log(chalk.bgRedBright.white("Error connecting to MongoDB:"), error);
  }
};
export default connectDB;