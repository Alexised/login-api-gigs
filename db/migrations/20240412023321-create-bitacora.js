'use strict';

const { BITACORA_TABLE } = require('../models/bitacora.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(BITACORA_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      locationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(BITACORA_TABLE);
  }
};
