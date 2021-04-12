const express = require('express');
const app = express();
const cors = require('cors');

const blogRouter = require('./controllers/blogs');

const logger = require('./utils/logger');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
