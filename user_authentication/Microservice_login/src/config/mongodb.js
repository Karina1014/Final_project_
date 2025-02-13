import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://3.84.3.175:27017/mern_auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database Connected Successfully");

    // Evento para cuando la conexión se pierde y se reconecta automáticamente
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database Disconnected. Retrying...");
    });

  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1); // Detiene la aplicación si no puede conectarse a MongoDB
  }
};

export default connectDB;
