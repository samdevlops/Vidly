//This file has all the routes for customers

const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customer');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(400).send("Customer with given id doesn't exist...");

    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name : req.body.name,
        isGold : req.body.isGold ? req.body.isGold : false,
        phone : req.body.phone
    });

    const result = await customer.save(customer);

    res.send(result);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const customer = {
        name : req.body.name,
        isGold : req.body.isGold ? req.body.isGold : false,
        phone : req.body.phone
    }

    const result = await Customer.findByIdAndUpdate(req.params.id, customer, {new : true});

    if(!result) return res.status(404).send("Customer with given id doesn't exist...");

    res.send(result);
});

router.delete('/:id', async (req, res) =>{
    const result = await Customer.findByIdAndDelete(req.params.id);

    if(!result) return res.status(404).send("Customer with given id doesn't exist...");

    res.send(result);
});

module.exports = router;