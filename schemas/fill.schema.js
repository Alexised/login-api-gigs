const Joi = require('joi');

const name = Joi.string().min(3).max(130);
const code = Joi.string().min(3).max(30);
const activity = Joi.string();

const createFillSchema = Joi.object({
  codeForm: code.required(),
  nameForm: name.required(),
  codeInspectionCompany: Joi.string().required(),
  brand: Joi.string().required(),
  city: Joi.string().required(),
  dateFirstUse: Joi.date().required(),
  inspectionFrequency: Joi.string().required(),
  fabricationDate: Joi.date().required(),
  purchasedate: Joi.date().required(),
  serialLotNumber: Joi.string().required(),
  modelnumber: Joi.string().required(),
  internalNumber: Joi.string().required(),
  record: Joi.string().required(),
  apto: Joi.boolean().required(),
  activities: Joi.array().items(Joi.object({
    activity: activity.required(),
    status: Joi.string().valid('B', 'V', 'D', 'N/A').required(),
    observations: Joi.string().required()
  })).min(1).required(),
  date: Joi.date().required(),
  reviewedBy: Joi.string().required(),
  idsignature: Joi.number().integer().required(),
  imageProduct: Joi.string().required(),
  imageProduct2: Joi.string().required()
});

module.exports = { createFillSchema };
