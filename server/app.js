const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    });
}

// Middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
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
const product = require('./controller/product')
app.use("/api/v2/product",product)

// Error handling middleware
app.use(ErrorHandler);

module.exports = app;
