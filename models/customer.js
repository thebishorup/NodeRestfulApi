const Joi = require('joi');
const mongoose = require('mongoose');

//create customer schema
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isGold: Boolean
});

//create customer model
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;