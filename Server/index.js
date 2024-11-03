const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { ConnectToMongo } = require("./Function/connection");

ConnectToMongo("mongodb://127.0.0.1:27017/Personal_portfolio")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

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
app.use("/api/information", require("./Function/information"));
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
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;

