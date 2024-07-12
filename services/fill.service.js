const { models } = require('../libs/sequelize');


async function createForm(formData) {
  try {
    const form = await models.Fill.create(formData);
    return form;
  } catch (error) {
    throw new Error('Error al crear el formulario');
  }
}

async function getAllForms() {
  try {
    const forms = await models.Fill.findAll();
    return forms;
  } catch (error) {
    throw new Error('Error al obtener todos los formularios');
  }
}

async function getFormById(id) {
  try {
    const form = await models.Fill.findByPk(id);
    if (!form) {
      throw new Error('Formulario no encontrado');
    }
    return form;
  } catch (error) {
    throw new Error('Error al obtener el formulario por ID');
  }
}

module.exports = { createForm, getAllForms, getFormById };
