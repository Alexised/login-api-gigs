const express = require('express');
const router = express.Router();
const { createEventSchema } = require('../schemas/event.schema');
const EventService = require('../services/event.service');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const eventService = new EventService();
router.post('/',
password.authenticate('jwt', {session: false}),
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
password.authenticate('jwt', {session: false}),
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
password.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventService.findOneByid(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:code',
  password.authenticate('jwt', { session: false }),
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
