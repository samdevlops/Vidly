const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

//GET root
app.get('/', (req, res) => {
    res.send("Home Page...");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server is up and running..."));