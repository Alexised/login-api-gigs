const { Model, DataTypes } = require('sequelize');
const { LOCATION_TABLE } = require('./location.model');
const { union } = require('lodash');

const BITACORA_TABLE = 'bitacoras';

const BitacoraSchema = {
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
  locationId: {
    field: 'locationId',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: LOCATION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

class Bitacora extends Model {
  static associate(models) {
    this.belongsTo(models.Location, { foreignKey: 'locationId', as: 'location' });
    this.hasMany(models.BitacoraEvent, { foreignKey: 'bitacoraId', as: 'events' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BITACORA_TABLE,
      modelName: 'Bitacora',
      timestamps: false
    };
  }
}

module.exports = { Bitacora, BitacoraSchema, BITACORA_TABLE };
