'use strict';

const { SIGNATURE_TABLE } = require('./../models/signature.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(SIGNATURE_TABLE, {
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
      forms: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      signature: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(SIGNATURE_TABLE);
  }
};
