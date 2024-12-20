const dotenv = require("dotenv");

// const env = process.env.NODE_ENV || "development";
const envFilePath = `.env.development`;

dotenv.config({ path: envFilePath, override: true });

// Log the loaded environment variables for debugging
console.log(`Loaded environment variables from ${envFilePath}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

const config = {
  mongo: {
    uri: process.env.MONGO_URI,
  },
};

module.exports = config;
