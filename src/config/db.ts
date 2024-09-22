import mongoose from "mongoose";
import { Config } from '../config/index';

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
     console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error in connecting to database.", err);
    });

    await mongoose.connect(Config.MONGO_URL as string);
  } catch (err) {
    console.error("Error in connecting to database.", err);
    process.exit(1);
  }
};

export default connectDB;
