// routes/bitacora-event.router.js
const express = require('express');
const router = express.Router();
const { createBitacoraEventSchema } = require('../schemas/bitacora-event.schema');
const BitacoraEventService = require('../services/bitacora-event.service');
const validationHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const CustomerService = require('../services/customers.service'); // Assuming you have a CustomerService to fetch customer by userId
const BitacoraService = require('../services/bitacora.service');

const bitacoraEventService = new BitacoraEventService();
const customerService = new CustomerService();
const bitacoraService = new BitacoraService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(2),
  validationHandler(createBitacoraEventSchema, 'body'),
  async (req, res) => {
    try {
      const { userId, nameForm, activities,  locationId } = req.body;

      // Fetch customerId from the Customer table using userId
      const customer = await customerService.findByUserId(userId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      const customerId = customer.id;
      const bitacora = await bitacoraService.findByLocationId(locationId);
      if (!bitacora) {
        throw new Error('Bitacora not found for the given locationId');
      }
      const bitacoraId = bitacora.id;
      
      // Create the new bitacora event
      const newEvent = await bitacoraEventService.createEvent({
        nameForm,
        activities,
        bitacoraId,
        customerId
      });

      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const events = await bitacoraEventService.findAll();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const event = await bitacoraEventService.findOneById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res) => {
    try {
      const id = req.params.id;
      const result = await bitacoraEventService.deleteById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
