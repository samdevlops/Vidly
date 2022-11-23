const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

mongoose.connect('mongodb://0.0.0.0:27017/vidly')
    .then(() => console.log("Successfully connected to mongodb database..."))
    .catch( err => console.error("OOPS!! Could not connect to mongodb..."+err));

//GET root
app.get('/', (req, res) => {
    res.send("Welcome to Vidly Application...");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server is up and running..."));