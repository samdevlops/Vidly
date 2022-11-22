//This file has all the routes for genres
const express = require('express');
const router = express.Router();
const {Genre, validateName} = require('../models/genre');

//GET all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('title');
    res.send(genres);
});

//GET a single genre based on ID
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById( req.params.id);

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");

    res.send(genre);
});

//PUT -> update an genre
router.put('/:id', async (req, res) => {
    const { error } = validateName(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate( req.params.id, { title : req.body.title}, {
        new : true
    });

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");

    res.send(genre);
});

//POST an genre to the genres
router.post('/', async (req, res) => {
    const { error } = validateName(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({  
        title: req.body.title 
    });

    const result =  await genre.save(genre);

    res.send(result);
});

//DELETE request
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete( req.params.id);

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");

    res.send(genre);
});

module.exports = router;