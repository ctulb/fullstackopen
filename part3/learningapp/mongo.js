const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error('MongoDB connection string was not set');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML is easy',
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log('Note saved!');
  mongoose.connection.close();
});
