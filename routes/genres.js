const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const schema = mongoose.Schema ({
    title : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    }
});

const Genre =  mongoose.model('Genre', schema);

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

//Function to validate genre name
function validateName(name){
    const schema = Joi.object({
        title : Joi.string().min(5).required()
    });

    return schema.validate(name);
}

module.exports = router;