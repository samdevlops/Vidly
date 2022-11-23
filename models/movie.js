const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = {
    title : {
        type : String,
        trim : true,
        required : true,
        minlength : 5,
        maxlength : 100
    },
    genre : {
        type : genreSchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }
}

const Movies = mongoose.model('Movies', movieSchema);

//Function to validate genre movie
function validateMovie(movie){
    const schema = Joi.object({
        title : Joi.string().min(5).required(),
        numberInStock : Joi.number().required(),
        dailyRentalRate : Joi.number().required(),
        genreId : Joi.string().required()
    });

    return schema.validate(movie);
}

exports.Movies = Movies;
exports.validateMovie = validateMovie;