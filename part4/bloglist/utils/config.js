require('dotenv').config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = {
  MONGODB_CONNECTION_STRING,
};
