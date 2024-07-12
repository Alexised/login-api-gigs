const Joi = require('joi');

const name = Joi.string().min(3).max(130);
const activity = Joi.string();

const createEventSchema = Joi.object({
  name: name.required(),
  fields: Joi.array().items(Joi.object({
    label: activity.required(),
    type:activity.required(),
    options: Joi.array().items(Joi.string()).optional()
  })).min(1).required()
});


module.exports = { createEventSchema };
