const Joi = require('joi');

const name = Joi.string().min(3).max(130).required();
const customerId = Joi.number().integer().required();

const createLocationSchema = Joi.object({
  name: name,
  customerId: customerId
});

module.exports = { createLocationSchema };
