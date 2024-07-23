// schemas/bitacora-event.schema.js
const Joi = require('joi');

const createBitacoraEventSchema = Joi.object({
  nameForm: Joi.string().required(),
  activities: Joi.array().items(Joi.object()).optional(),
  userId: Joi.number().integer().required(),
  locationId:Joi.number().integer().required(),
});

module.exports = { createBitacoraEventSchema };
