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

app.use("/api/form", require("./Function/Form-data"));
app.use("/api/jQuery/code", require("./JQuery/jQuery"));
app.use("/api/php/code", require("./PHP/php"));
app.use("/api/javascript/code", require("./javascript/javascript"));
app.use("/api/html/code", require("./HTML/html"));
app.use("/api/c__/code", require("./C++/C++"));
app.use("/api/css/code", require("./CSS/css"));
app.use("/api/SQL/code", require("./SQL/sql"));
app.use("/api/DSAC/code", require("./DS in C plus/c++"));
app.use("/api/project/code", require("./Project/project"));
app.use("/api/pdf", require("./PDF/pdf"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("jo a error ava cha:", err.message);
  console.error("jo stack ma error cha yar:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

module.exports = app;


// 196jmlHWg6xKI6bF5YPv7jeniL6ZY1272n+y2exu secrat
// AKIA356SJ2W2UNLDA7VG // access key




