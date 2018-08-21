const winston = require('winston');
const express = require('express');
const app = express();

//Load the statup module
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


//Reading the port from environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => {
    winston.info(`Listening is port ${ port }...`);
});