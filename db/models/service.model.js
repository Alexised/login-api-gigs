const { Model, DataTypes, Sequelize } = require('sequelize');

const SERVICE_TABLE = 'services';

const ServiceSchema = {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  serviceType: {
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'ACTIVO'
  }
};

class Service extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICE_TABLE,
      modelName: 'Service',
      timestamps: false
    };
  }
}

module.exports = { Service, ServiceSchema, SERVICE_TABLE };
