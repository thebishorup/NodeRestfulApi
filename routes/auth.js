const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //check if user already registered
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthTokens();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;