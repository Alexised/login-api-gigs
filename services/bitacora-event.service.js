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
  async findByBitacoraId(bitacoraId) {
    return await models.BitacoraEvent.findAll({
      where: { bitacoraId },
    });
  }
  async findByUserIdAndNameForm(customerId, nameForm) {
    const event = await models.BitacoraEvent.findOne({
      where: {
        customerId,
        nameForm,
      },
    });
    return event;
  }
  async findOneById(id) {
    const event = await models.BitacoraEvent.findByPk(id);
    if (!event) {
      throw new Error('Event not found');
    }
    const transformedEvent = {
      id: event.id,
      name: event.nameForm,
      fields: event.activities.map(activity => ({
        type: activity.type,
        label: activity.label,
        value: activity.value
      }))
    };

    return transformedEvent;
  }

  async deleteById(id) {
    const event = await this.findOneById(id);
    await event.destroy();
    return { message: 'Event deleted successfully' };
  }
}

module.exports = BitacoraEventService;
