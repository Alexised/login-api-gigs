'use strict';

const { EVENT_TABLE } = require('../models/event.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(EVENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fields: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: []
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(EVENT_TABLE);
  }
};
