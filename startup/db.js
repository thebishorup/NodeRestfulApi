const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    //mongoose db connection
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to the Mongo db'))
}