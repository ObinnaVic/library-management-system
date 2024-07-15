const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError.js");
const process = require("process");
const db = require("./db.js");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./modules/auth/auth.route.js");
const BookRoutes = require("./modules/books/books.routes.js");
const UserRoutes = require("./modules/user/user.routes.js");
const RecordRoute = require("./modules/records/records.routes.js");

const app = express();
(async () => {
  try {
    // MongoDB's configuration and connection
    
    // await db.connectToDatabase(); //NOTE: Comment this connection out during testing

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json());

    app.use(cookieParser());

    // default path
    app.get("/", (req, res) => {
      res.send("Library System Application is Running!");
    });

    //Admin Routes
    app.use("/api/v1/library/user", AuthRoute);

    // User routes
    app.use("/api/v1/library/admin", UserRoutes);

    // book routes
    app.use("/api/v1/library/book", BookRoutes);

    // Record routes
    app.use("/api/v1/library/record", RecordRoute);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();

module.exports = app;
