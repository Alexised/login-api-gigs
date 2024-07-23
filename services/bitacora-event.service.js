// services/bitacora-event.service.js
const { models } = require('../libs/sequelize');

class BitacoraEventService {
  async createEvent(data) {
    const newEvent = await models.BitacoraEvent.create(data);
    return newEvent;
  }

  async findAll() {
    const events = await models.BitacoraEvent.findAll();
    return events;
  }

  async findOneById(id) {
    const event = await models.BitacoraEvent.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async deleteById(id) {
    const event = await this.findOneById(id);
    await event.destroy();
    return { message: 'Event deleted successfully' };
  }
}

module.exports = BitacoraEventService;
