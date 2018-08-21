const express = require('express');
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const rentals = require('../routes/rentals');
const movies = require('../routes/movies');
const customers = require('../routes/customers')
const genres = require('../routes/genres');

module.exports = function(app) {
    //Enable JSON request
    app.use(express.json());
    //Initialize Modules
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    //Error middleware should be called after all middleware
    app.use(error);
}