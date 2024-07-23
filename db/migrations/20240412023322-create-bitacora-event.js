'use strict';

const { BITACORA_EVENT_TABLE } = require('./../models/bitacora-event.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(BITACORA_EVENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      nameForm: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activities: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      bitacoraId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bitacoras',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      creationDate: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(BITACORA_EVENT_TABLE);
  }
};
