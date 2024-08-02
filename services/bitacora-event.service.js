// services/bitacora-event.service.js
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
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
      include: ['customer']
    });
  }
  async findByUserIdAndNameForm(customerId, nameForm) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999)
    const event = await models.BitacoraEvent.findOne({
      where: {
        customerId,
        nameForm,
        creationDate: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
    });
    return event;
  }

  async findByCustomerId(customerId) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999)
    const event = await models.BitacoraEvent.findAll({
      where: {
        customerId,
        creationDate: {
          [Op.between]: [todayStart, todayEnd],
        },
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
