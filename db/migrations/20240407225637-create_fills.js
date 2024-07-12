'use strict';
const { Fill_TABLE } = require('../models/fill.model');
const { SIGNATURE_TABLE } = require('../models/signature.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(Fill_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameForm: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codeForm: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codeInspectionCompany: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateFirstUse: {
        allowNull: false,
        type: Sequelize.DATE
      },
      inspectionFrequency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fabricationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      purchasedate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      serialLotNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modelnumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      internalNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      record: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activities: {
        type: Sequelize.JSONB,
        defaultValue: [],
        allowNull: true
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reviewedBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apto: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      imageProduct: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imageProduct2: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      idsignature: {
        field: 'idsignature',
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model: SIGNATURE_TABLE, // Assuming the model name for Signature is 'Signature'
          key: 'id' // Assuming the primary key of Signature is 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(Fill_TABLE);
  }
};
