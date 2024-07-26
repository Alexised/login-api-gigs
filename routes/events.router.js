const express = require('express');
const router = express.Router();
const { createEventSchema } = require('../schemas/event.schema');
const EventService = require('../services/event.service');
const validationHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const eventService = new EventService();
router.post('/',
  passport.authenticate('jwt', {session: false}),
checkRoles(1),
validationHandler(createEventSchema, 'body'),
async (req, res) => {
  try {
    const body = req.body;
    const newEvent = await eventService.createEvent(body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/',
  passport.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const forms = await eventService.findAll();
    res.status(200).json(forms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para buscar un formulario por su código
router.get('/:id',
  passport.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventService.findOneByid(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validationHandler(createEventSchema, 'body'), // Usa el esquema de validación para actualización si es diferente
  async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedEvent = await eventService.updateEvent(id, body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete('/:code',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res) => {
    try {
      const code = req.params.code;
      const result = await eventService.deleteByCode(code);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
