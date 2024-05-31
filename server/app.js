const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: path.join(__dirname, "config/.env")
    });
}

// Middleware
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// Middleware to handle file uploads
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use("/", express.static("uploads"));

// Import routes
const user = require('./controller/user');
app.use("/api/v2/user", user);
const product = require('./controller/product');
app.use("/api/v2/product", product);

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
