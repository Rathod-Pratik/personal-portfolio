import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Database connection string
const CONNECTION_STRING = "mongodb://127.0.0.1:27017/ali-bhai";

// Setting the port
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);
app.get('/',(req,res)=>{
  res.status(200).send("Hello world");
})
// Start server and connect to the database
const start = async () => {
  try {
    // Connect to MongoDB
    const connectionDb = await mongoose.connect(CONNECTION_STRING);

    console.log(`MongoDB Connected: ${connectionDb.connection.host}`);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process with failure
  }
};

start();
