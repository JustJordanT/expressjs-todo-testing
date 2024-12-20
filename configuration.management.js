const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "development";
const envFilePath = `.env.${env}`;

dotenv.config({ path: envFilePath, override: true });

const config = {
  mongo: {
    uri: process.env.MONGO_URI,
  },
};

module.exports = config;
