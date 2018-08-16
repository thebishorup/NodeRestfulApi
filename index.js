const customers = require('./routes/customers')
const genres = require('./routes/genres');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

//Enable JSON request
app.use(express.json());

//mongoose db connection
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to the Mongo db'))
    .catch((err) => console.error('Cound not connect to Mondo db', err));

//Initialize Modules
app.use('/api/genres', genres);
app.use('/api/customers', customers);

//Reading the port from environment variable
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening is port ${ port }...`);
});