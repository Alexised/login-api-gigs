'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { ROLE_TABLE } = require('./../models/role.model');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      }
    });
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      roleId: {
        field: 'role_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: ROLE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
    await queryInterface.bulkInsert(ROLE_TABLE, [
      { name: 'admin' },
      { name: 'guard' },
      { name: 'supervisor' }
    ], {});
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        field: 'last_name',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        unique: true,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
