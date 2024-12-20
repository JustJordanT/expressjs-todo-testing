const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://jordantay9014:IJiH8bKIzDJ6TBLi@cluster0.majhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

module.exports = connect;
