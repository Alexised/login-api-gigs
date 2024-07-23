const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class LocationService {

  constructor() { }

  async createLocation(data) {
    try {
      const newLocation = await models.Location.create(data);
      return newLocation;
    } catch (error) {
      throw boom.badImplementation('Error al crear la ubicación', error);
    }
  }


  async findAll() {
    try {
      const locations = await models.Location.findAll({
        attributes: ['name', 'id'], // Obtener solo los campos 'name' y 'id'
        include: [{
          model: models.Customer,
          as: 'customer',
          attributes: ['name'] // Obtener solo el campo 'name' del cliente asociado
        }]
      });
      return locations;
    } catch (error) {
      throw boom.badImplementation('Error al buscar las ubicaciones', error);
    }
  }
  async findOneById(id) {
    try {
      const location = await models.Location.findOne({
        where: {
          id: id
        },
        include: ['customer'] // Incluye información del cliente relacionado
      });
      if (!location) {
        throw boom.notFound('Ubicación no encontrada');
      }
      return location;
    } catch (error) {
      throw boom.badImplementation('Error al buscar la ubicación', error);
    }
  }

  async deleteById(id) {
    try {
      const location = await models.Location.findOne({
        where: {
          id: id
        }
      });
      if (!location) {
        throw boom.notFound('Ubicación no encontrada');
      }
      await location.destroy();
      return { message: 'Ubicación eliminada correctamente' };
    } catch (error) {
      throw boom.badImplementation('Error al eliminar la ubicación', error);
    }
  }

  async updateLocation(id, changes) {
    try {
      const location = await models.Location.findByPk(id);
      if (!location) {
        throw boom.notFound('Ubicación no encontrada');
      }
      const updatedLocation = await location.update(changes);
      return updatedLocation;
    } catch (error) {
      throw boom.badImplementation('Error al actualizar la ubicación', error);
    }
  }
}

module.exports = LocationService;
