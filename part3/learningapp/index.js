const express = require('express');
const app = express();

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.use(express.json());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'missing content' });
  }
  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  };

  notes.concat(note);
  res.status(201).json(note);
});

app.get('/api/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    res.json(foundNote);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.sendStatus(204);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
