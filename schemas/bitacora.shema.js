const Joi = require('joi');
const id = Joi.number().integer();
const name = Joi.string().min(3).max(30).required();
const locationId = Joi.number().integer().required();
const active = Joi.boolean();

const createBitacoraSchema = Joi.object({
  name: name.required(),
  locationId: locationId.required(),
  active: active.default(true) // Por defecto activa la bitácora
});

const updateBitacoraSchema = Joi.object({
  name: name.optional(),
  locationId: locationId.optional(),
  active: active.optional()
});

const getBitacoraSchema = Joi.object({
  id: id.required()
});

module.exports = { createBitacoraSchema, updateBitacoraSchema, getBitacoraSchema };
