const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb.connect");

console.log("Starting the server...");
console.log("Connecting to the database...");

mongodb();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
