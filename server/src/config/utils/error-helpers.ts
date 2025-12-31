import mongoose from 'mongoose';

// Graceful shutdown: close MongoDB connection properly
export const gracefulShutdown = async () => {
  console.log("\n🛑 Shutting down gracefully... Closing MongoDB connection");
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed cleanly ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB shutdown:", err);
    process.exit(1);
  }
};