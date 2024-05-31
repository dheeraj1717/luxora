const app = require("./app");
const dbConnect = require('./db/dbConnect');
const { cloudinaryConnect } = require('./config/cloudinary');
const path = require('path');

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.join(__dirname, "config/.env"),
  });
}

dbConnect();
cloudinaryConnect();

// Use the port provided by Render or default to 8000 for local development
const PORT = process.env.PORT || 8000;

// Create server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
