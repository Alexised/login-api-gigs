const Joi = require('joi');

const name = Joi.string().required();
const forms = Joi.array().items(Joi.string());
const signature = Joi.string().required();

const createSignatureSchema = Joi.object({
  name: name.required(),
  forms: forms.required(),
  signature: signature.required()
});


module.exports = { createSignatureSchema };
