const Joi = require('joi');
const mongoose = require('mongoose');

//define custom customer schema
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

//define custom movie schema
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        trim: true,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
})

//create rental schema
const rentalSchema = mongoose.Schema({
    customer: { type: customerSchema, required: true },
    movie: { type: movieSchema, required: true },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

//create rental model
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;