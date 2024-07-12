const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById } = require('../services/fill.service');
const { createFillSchema } = require('../schemas/fill.schema');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
// Crear un formulario
router.post('/',
password.authenticate('jwt', {session: false}),
validationHandler(createFillSchema, 'body'),
async (req, res) => {
  try {
    const { body } = req;
    const validatedData = await createFillSchema.validateAsync(body);
    const form = await createForm(validatedData);
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los formularios
router.get('/',
password.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const forms = await getAllForms();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un formulario por ID
router.get('/:id',
// password.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const { id } = req.params;
    const form = await getFormById(id);
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
