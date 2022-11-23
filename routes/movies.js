const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { Movies, validateMovie } = require('../models/movie');

router.get('/', async (req, res) => {
    const movies = await Movies.find().sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movies.findById(req.params.id);

    if(!movie) return res.status(404).send('Movie with given ID does not exist');

    res.send(movie);
});

router.post('/', async (req, res) => {
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid Genre...');

    const movie = new Movies({
        title : req.body.title,
        genre : {
            _id: genre._id,
            title : genre.title
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    });

    const result = await movie.save(movie);

    res.send(result);
});

router.delete('./:id', async (req, res) => {
    const movie = await Movies.findByIdAndDelete(req.params.id);

    if(!movie) return res.status(404).send("Movie with given ID does not exist...");

    res.send(movie);
});


module.exports = router;