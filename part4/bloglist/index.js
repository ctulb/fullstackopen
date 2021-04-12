const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const Blog = require('./models/blog');
const blogRouter = require('./controllers/blogs');

const config = require('./utils/config');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_CONNECTION_STRING;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
