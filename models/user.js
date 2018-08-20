const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//create user schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
    isAdmin: Boolean
})

userSchema.methods.generateAuthTokens = function() {
    //generate token
    //TODO: read the private key from env variables | DO NOT use directly
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'jwtPrivateKey');
    return token;
}

//create user model
const User = mongoose.model('User', userSchema);

//validate user
function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required()
    }

    return Joi.validate(user, schema);
}

//export
exports.User = User;
exports.validate = validateUser;