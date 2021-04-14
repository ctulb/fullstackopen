require('dotenv').config();
const logger = require('./logger');

const MONGODB_CONNECTION_STRING =
  process.env.NODE_ENV === 'test'
    ? process.env.TESTDB_CONNECTION_STRING
    : process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.PORT || 3000;

if (!MONGODB_CONNECTION_STRING) {
  logger.error('MongoDB connection string not set, exiting');
  process.exit(1);
}

module.exports = {
  MONGODB_CONNECTION_STRING,
  PORT,
};
