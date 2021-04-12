require('dotenv').config();
const logger = require('./logger');

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_CONNECTION_STRING) {
  logger.error('MongoDB connection string not set, exiting');
  process.exit(1);
}

module.exports = {
  MONGODB_CONNECTION_STRING,
};
