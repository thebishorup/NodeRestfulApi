const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

//Initialize fawn
Fawn.init(mongoose);

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    res.send(rentals);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.send(400, error.details[0].message);

    //get customer by customerId
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    //get movie by movieId
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    if (movie.numberInStock == 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    // //use transaction -- Fawn
    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', { _id: movie._id }, {
    //             $inc: {
    //                 numberInStock: -1
    //             }
    //         })
    //         .run();
    // } catch (ex) {
    //     res.status(500).send('Something went wrong.');
    // }

    rental = await rental.save();

    //decrement the number of stock
    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

module.exports = router;