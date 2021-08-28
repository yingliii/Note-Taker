const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const allNotes = require('./db/db.json');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// METHODS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    allNotes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));

    res.json(`Note added successfully!!!`);
  } else {
    res.err('ERROR, unsuccessfully created note.');
  }
});

// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id.toString();

//   const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

//   const newData = data.filter((note) => note.id.toString() != noteId);

//   fs.writeFileSync('./db/db.json', JSON.stringify(newData));

//   res.json(newData);
// });

// listen to the port
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
