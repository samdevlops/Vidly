const mongoose = require('mongoose');
const Joi = require('joi');
//const { boolean, string } = require('joi');


const customerSchema = mongoose.Schema({
    name : {
        type : String,
        minLength : 3,
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
        minLength : 10,
        maxLength : 10
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        isGold : Joi.boolean(),
        phone : Joi.string().min(10).max(10).required()
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
