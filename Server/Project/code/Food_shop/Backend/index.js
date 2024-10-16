const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./api/index');  // Import the API routes

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: ["https://my-food-zone.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you need to send cookies or auth headers
};
app.use(cors(corsOptions));
// Middleware to set Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://vercel.live;");
    next();
});

// Serve static files from the "public/images" directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Use the API routes
app.use("/api", apiRoutes);  // Mount the API routes

// Root route for checking server status
app.get('/', (req, res) => {
    res.end("Server is running");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error message:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start the server
app.listen(5000, () => console.log("Server is running"));