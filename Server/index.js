const express = require("express");
const cors = require("cors");

const app = express();
  app.use(cors({
    origin: ["https://pratikofficial.vercel.app"],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true
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

// app.listen(5000,()=>console.log("Server listen at 5000"));
module.exports = app;


// 196jmlHWg6xKI6bF5YPv7jeniL6ZY1272n+y2exu secrat
// AKIA356SJ2W2UNLDA7VG // access key




