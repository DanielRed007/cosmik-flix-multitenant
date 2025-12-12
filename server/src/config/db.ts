import mongoose from "mongoose";


const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected → cosmik DB 🔥");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;