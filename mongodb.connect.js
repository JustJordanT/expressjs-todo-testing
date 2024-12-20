const mongoose = require("mongoose");

async function connect(connectionString) {
  try {
    await mongoose.connect(connectionString);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

module.exports = connect;
