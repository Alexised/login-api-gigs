const express = require('express');
const router = express.Router();
const { createLocationSchema } = require('../schemas/location.schema');
const LocationService = require('../services/location.service');
const validationHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const locationService = new LocationService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validationHandler(createLocationSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newLocation = await locationService.createLocation(body);
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const locations = await locationService.findAll();
      res.status(200).json(locations);
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
      const location = await locationService.findOneById(id);
      res.status(200).json(location);
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
      const result = await locationService.deleteById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validationHandler(createLocationSchema, 'body'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedLocation = await locationService.updateLocation(id, body);
      res.status(200).json(updatedLocation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);


module.exports = router;
