const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { connectDatabase } = require("./utils/database");

const errorMiddleware = require("./middleware/error");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "utils/config.env" });
}
connectDatabase();
// module.exports = conn;
// let gfs;





app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports
const auth = require("./routes/auth");
const classroom = require("./routes/class");
const exam = require("./routes/exam")
app.use("/api/v1", auth);
app.use("/api/v1/class", classroom);
app.use("/api/v1/exam" , exam);

// Middleware for Errors
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

require("./utils/socketIO")(server);

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
