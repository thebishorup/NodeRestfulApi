const { GenreSchema } = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

//create movie schema
const movieSchema = mongoose.Schema({
    title: { type: String, required: true, min: 3 },
    genre: { type: GenreSchema, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true }
});

//create movie model
const Movie = mongoose.model('Movies', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;