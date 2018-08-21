const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    //NOTE: the nodejs uncoughtException can be hadled using wisnton || commenting above
    //logging unhandled execeptions separately by winston
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncoughtExceptions.log' })
    );

    //handling unhandled promise rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    //Transport logging message to the file
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidly',
    //     level: 'info'
    // });
}