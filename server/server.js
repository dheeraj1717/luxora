const app = require("./app");
const dbConnect = require('./db/dbConnect')
const {cloudinaryConnect} = require('./config/cloudinary')
// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

dbConnect();
cloudinaryConnect();
// create server
const port = process.env.PORT||8000
const server = app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});