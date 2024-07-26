const express = require('express');
const router = express.Router();
const { createBitacoraSchema, updateBitacoraSchema } = require('../schemas/bitacora.shema');
const BitacoraService = require('../services/bitacora.service');
const validationHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

const bitacoraService = new BitacoraService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validationHandler(createBitacoraSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newBitacora = await bitacoraService.createBitacora(body);
      res.status(201).json(newBitacora);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const bitacoras = await bitacoraService.findAll();
      res.status(200).json(bitacoras);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
router.get('/user/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const bitacoras = await bitacoraService.findByUserId(id);
      res.status(200).json(bitacoras);
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
      const bitacora = await bitacoraService.findOneById(id);
      res.status(200).json(bitacora);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validationHandler(updateBitacoraSchema, 'body'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedBitacora = await bitacoraService.updateBitacora(id, body);
      res.status(200).json(updatedBitacora);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res) => {
    try {
      const id = req.params.id;
      const result = await bitacoraService.deleteById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router;
