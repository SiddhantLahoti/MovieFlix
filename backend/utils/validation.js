const Joi = require('joi');

const movieSchema = Joi.object({
    title: Joi.string().required().trim(),
    genre: Joi.string().required(),
    rentalPrice: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    posterImage: Joi.string().uri().allow(''),
    description: Joi.string().required()
});

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    adminCode: Joi.string().allow('')
});

module.exports = { movieSchema, registerSchema };