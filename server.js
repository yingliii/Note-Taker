const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

const allNotes = require('./db/db.json');
// middleware
app.use(express.static('public'));

// METHODS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app
  .route('/api/notes')
  .get((req, res) => {
    return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
  })
  .post((req, res) => {
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

// listen to the port
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
