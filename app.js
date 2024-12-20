const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb.connect");
const notFoundHandler = require("./middlewares/notfound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const config = require("./configuration.management");

console.log("Starting the server...");

try {
  console.log("Connecting to the database...");
  mongodb(config.mongo.uri);
} catch (error) {
  console.log("Database connection failed - ", error);
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

// Error handling
app.use(notFoundHandler); // Handle 404s
app.use(errorHandler); // Handle all other errors

module.exports = app;
