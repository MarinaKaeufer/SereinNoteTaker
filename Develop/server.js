// Import express package
const express = require('express');

// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.static('public'));

// Add a static route for index.html
app.get('/', (req, res) => {
  // `res.sendFile` is Express' way of sending a file
  // `__dirname` is a variable that always returns the directory that your server is running in
  res.sendFile(__dirname + '/public/index.html');
});

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
})

// Get all notes
app.get('/api/notes', (req, res) => res.json(notesData));

//

app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);
