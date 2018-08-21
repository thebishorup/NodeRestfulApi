const winston = require('winston');

function error(err, req, res, next) {
    //Logging exceptions
    winston.error(err.message, err);

    res.status(500).send('Something went wrong.');
}

module.exports = error;