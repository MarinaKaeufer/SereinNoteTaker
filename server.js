// Import express package
const { randomUUID } = require('crypto');
const express = require('express');

// Import 3rd party libraries
const fs = require('fs');
const uuid = require('./helpers/uuid');

// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

console.log(` `);
console.log(` `);
console.log(` `);
console.log(`After loading all middleware...`);

// Add a static route for index.html
app.get('/', (req, res) => {
  // `res.sendFile` is Express' way of sending a file
  // `__dirname` is a variable that always returns the directory that your server is running in
  console.log(`Get / root...`);
  console.log(`__dirname ${__dirname}`);
  res.sendFile(__dirname + '/public/index.html');
});

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
})

// Get all notes
app.get('/api/notes', (req, res) => res.json(notesData));

// Create a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        id: uuid(),
        title,
        text
      };

      // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new review
          parsedNotes.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.json(response);
    } else {
        res.json('Error in posting a note');
    }
  });
  


app.listen(PORT, () =>
  console.log(`Notes app listening at http://localhost:${PORT}`)
);
