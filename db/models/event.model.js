const { Model, DataTypes, Sequelize } = require('sequelize');

const EVENT_TABLE = 'events';

const EventSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fields: {
    type: DataTypes.JSONB,
    defaultValue: [],
    allowNull: true
  }
};

class Event extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVENT_TABLE,
      modelName: 'Event',
      timestamps: false
    };
  }
}

module.exports = { Event, EventSchema, EVENT_TABLE };
