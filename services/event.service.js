const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class EventService {

  constructor() {}

  async createEvent(data) {
    try {
      const newEvent = await models.Event.create(data);
      return newEvent;
    } catch (error) {
      throw boom.badImplementation('Error al crear el formulario', error);
    }
  }
  async findAll() {
    try {
      const forms = await models.Event.findAll({
        attributes: ['name', 'id'] // Obtener solo los campos 'name' y 'code'
      });
      return forms;
    } catch (error) {
      throw boom.badImplementation('Error al buscar los formularios', error);
    }
  }
  async findOneByid(id) {
    try {
      const form = await models.Event.findOne({
        where: {
          id: id
        }
      });
      if (!form) {
        throw boom.notFound('Eventulario no encontrado');
      }
      return form;
    } catch (error) {
      throw boom.badImplementation('Error al buscar el formulario', error);
    }
  }
  async deleteByCode(code) {
    try {
      const form = await models.Event.findOne({
        where: {
          id: code
        }
      });
      if (!form) {
        throw boom.notFound('Eventulario no encontrado');
      }
      await form.destroy();
      return { message: 'Eventulario eliminado correctamente' };
    } catch (error) {
      throw boom.badImplementation('Error al eliminar el formulario', error);
    }
  }
}

module.exports = EventService;
