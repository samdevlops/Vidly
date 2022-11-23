const mongoose = require('mongoose');
const Joi = require('joi');

const Rentals = mongoose.model('Rentals',{
    customer : {
        type : new mongoose.Schema({
            name : {
                type : String,
                minLength : 5,
                maxLength : 50,
                required : true
            },
            isGold : {
                type : Boolean,
                default: false
            },
            phone : {
                type : String,
                required : true,
                minLength : 5,
                maxLength : 15
            }
        }),
        required : true
    },
    movie :{
        type: new mongoose.Schema({
            title : {
                type : String,
                trim : true,
                required : true,
                minlength : 5,
                maxlength : 100
            },
            dailyRentalRate : {
                type : Number,
                required : true,
                min : 0,
                max : 255
            }
        }),
        required :  true 
    },
    dateOut :{
        type : Date,
        required : true,
        default : Date.now
    },
    dateReturned :{
        type: Date
    },
    rentalFee :{
        type : Number,
        min : 0
    }
});

function validateRental(rental){
    const schema = Joi.object({
        customerId : Joi.string().required(),
        movieId : Joi.string().required()
    });

    return schema.validate(rental);
}

exports.Rentals = Rentals;
exports.validateRental = validateRental;