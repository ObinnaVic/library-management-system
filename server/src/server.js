const app = require("./app.js");
const http = require("https");
const Config = require("./config/config.js");
const process = require("process");
const { connectToDatabase } = require("./db.js");

const server = http.createServer(app);
connectToDatabase().then(() => {
  // Start the server after successful database connection
  server.listen(Config.APP_PORT, () => {
    console.log(`Server Listening at http://localhost:${Config.APP_PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    console.info("Library System Server is DOWN, Goodbye!");

    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
