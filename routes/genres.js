const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, title: 'comedy'},
    { id: 2, title: 'drama'},
    { id: 3, title: 'biography'},
    { id: 4, title: 'suspense'},
    { id: 5, title: 'thriller'}
]


//GET all genres
router.get('/', (req, res) => {
    res.send(genres);
});

//GET a single genre based on ID
router.get('/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");

    //const { error } = validateId(req.params.id);

    //if(error) return res.status(400).send(error.details[0].message);

    res.send(genre);
});


//PUT -> update an genre
router.put('/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");
    
    const { error } = validateName(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    genre.title = req.body.title;

    res.send(genre);
});


//POST an genre to the genres
router.post('/', (req, res) => {
    const { error } = validateName(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = { 
        id : genres.length + 1, 
        title: req.body.title 
    }

    genres.push(genre);

    res.send(genre);
});


//DELETE request
router.delete('/:id', (req, res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send("Genre with given ID does not exist...");

    const index = genres.indexOf(genre);

    genres.pop(index);

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