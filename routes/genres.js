const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Genre, validate } = require('../models/genre')
const express = require('express');
const router = express.Router();

router.get('/', auth, async(req, res) => {
    const genres = await Genre.find().sort({ name: 1 });
    res.send(genres);
});

router.get('/:id', auth, async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with given ID is not found.');
    res.send(genre);
});

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.send(400, error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404, error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with given ID is not found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with given ID is not found.');

    res.send(genre);
});

module.exports = router;