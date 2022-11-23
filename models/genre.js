const mongoose = require('mongoose');
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

//Function to validate genre name
function validateName(name){
    const schema = Joi.object({
        title : Joi.string().min(5).required()
    });

    return schema.validate(name);
}

exports.Genre = Genre;
exports.genreSchema = schema;
exports.validateName = validateName;