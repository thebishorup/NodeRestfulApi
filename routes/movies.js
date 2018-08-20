const auth = require('../middleware/auth');
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', auth, async(req, res) => {
    const movies = await Movie.find().sort({ title: 1 });
    res.send(movies);
});

router.get('/:id', auth, async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with given ID is not found.');
    res.send(movie);
});

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.send(400, error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404, error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.name,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    });

    if (!movie) return res.status(404).send('The movie with given ID is not found.');

    res.send(movie);
});

router.delete('/:id', auth, async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with given ID is not found.');

    res.send(movie);
});

module.exports = router;