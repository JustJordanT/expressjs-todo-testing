const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb.connect");
const notFoundHandler = require("./middlewares/notfound.middleware");
const errorHandler = require("./middlewares/error.middleware");

console.log("Starting the server...");
console.log("Connecting to the database...");

mongodb();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

// Error handling
app.use(notFoundHandler); // Handle 404s
app.use(errorHandler); // Handle all other errors

module.exports = app;
