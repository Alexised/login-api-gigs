const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BitacoraService {

  constructor() {}

  async createBitacora(data) {
    try {
      const newBitacora = await models.Bitacora.create(data);
      return newBitacora;
    } catch (error) {
      throw boom.badImplementation('Error al crear la bitácora', error);
    }
  }
  async findByLocationId(locationId) {
    try {
      return await models.Bitacora.findOne({ where: { locationId } });
    } catch (error) {
      throw new Error('Error fetching bitacora by locationId');
    }
  }

  async findAll() {
    try {
      const bitacoras = await models.Bitacora.findAll({
        attributes: ['id', 'name', 'locationId', 'active'],
        include: [{
          model: models.Location,
          as: 'location',
          attributes: ['name', 'customerId'],
          include: [{
            model: models.Customer,
            as: 'customer',
            attributes: ['name']
          }]
        }]
      });
      return bitacoras;
    } catch (error) {
      throw boom.badImplementation('Error al buscar las bitácoras', error);
    }
  }
  async findByUserId(userId) {
    // Buscar el user por userId
    const user = await models.User.findByPk(userId, {
      include: ['customer']
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const customerId = user.customer.id;

    // Buscar todas las locations por customerId
    const locations = await models.Location.findAll({
      where: { customerId }
    });

    const locationIds = locations.map(location => location.id);

    // Filtrar las bitácoras por locationId
    const bitacoras = await models.Bitacora.findAll({
      where: {
        locationId: locationIds
      },
      attributes: ['id', 'name', 'locationId', 'active'],
      include: [{
        model: models.Location,
        as: 'location',
        attributes: ['name', 'customerId'],
        include: [{
          model: models.Customer,
          as: 'customer',
          attributes: ['name']
        }]
      }]
    });

    return bitacoras;
  }

  async findOneById(id) {
    try {
      const bitacora = await models.Bitacora.findOne({
        where: {
          id: id
        },
        include: [{
          model: models.Location,
          as: 'location',
          attributes: ['name']
        }]
      });
      if (!bitacora) {
        throw boom.notFound('Bitácora no encontrada');
      }
      return bitacora;
    } catch (error) {
      throw boom.badImplementation('Error al buscar la bitácora', error);
    }
  }

  async updateBitacora(id, changes) {
    try {
      const bitacora = await models.Bitacora.findByPk(id);
      if (!bitacora) {
        throw boom.notFound('Bitácora no encontrada');
      }
      const updatedBitacora = await bitacora.update(changes);
      return updatedBitacora;
    } catch (error) {
      throw boom.badImplementation('Error al actualizar la bitácora', error);
    }
  }

  async deleteById(id) {
    try {
      const bitacora = await models.Bitacora.findOne({
        where: {
          id: id
        }
      });
      if (!bitacora) {
        throw boom.notFound('Bitácora no encontrada');
      }
      await bitacora.destroy();
      return { message: 'Bitácora eliminada correctamente' };
    } catch (error) {
      throw boom.badImplementation('Error al eliminar la bitácora', error);
    }
  }

}

module.exports = BitacoraService;
