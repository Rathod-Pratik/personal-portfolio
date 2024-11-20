import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

const app = express();

// Database connection string
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/ali-bhai";

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// Connect to MongoDB
const startDb = async () => {
  try {
    const connectionDb = await mongoose.connect(CONNECTION_STRING);
    console.log(`MongoDB Connected: ${connectionDb.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
startDb();

// Export the app for Vercel
export default app;
