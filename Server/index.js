const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors({
  origin: process.env.FRONTED, // Ensure FRONTED is set correctly in your .env file
  methods: ["POST", "PUT", "DELETE", "GET"], // Adjust methods if you need others like PATCH
  credentials: true // Allow cookies and authorization headers to be sent
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.end("server is running");
});

app.use('/api',require('./Routes/route'))

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("jo a error ava cha:", err.message);
  console.error("jo stack ma error cha yar:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(5000,()=>console.log("Server listen at 5000"));