const express = require('express');
const router = express.Router();
const SignatureService = require('../services/signature.service');
const { createSignatureSchema } = require('../schemas/signature.schema');
const validationHandler = require('../middlewares/validator.handler');
const password = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const signatureService = new SignatureService();

router.post('/',
password.authenticate('jwt', {session: false}),
checkRoles(1),
validationHandler(createSignatureSchema), async (req, res) => {
  try {
    const signatureData = req.body;
    const newSignature = await signatureService.createSignature(signatureData);
    res.status(201).json(newSignature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/',
password.authenticate('jwt', {session: false}),
async (req, res) => {
  try {
    const signatures = await signatureService.findAll();
    res.status(200).json(signatures);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id',
password.authenticate('jwt', {session: false}),
checkRoles(1),
async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSignature = await signatureService.deleteSignature(id);
    res.status(200).json(deletedSignature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id',
password.authenticate('jwt', {session: false}),
checkRoles(1),
validationHandler(createSignatureSchema), async (req, res) => {
  try {
    const id = req.params.id;
    const signatureData = req.body;
    const updatedSignature = await signatureService.updateSignature(id, signatureData);
    res.status(200).json(updatedSignature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
