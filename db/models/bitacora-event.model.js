const { Model, DataTypes } = require('sequelize');
const { BITACORA_TABLE } = require('./bitacora.model');
const { CUSTOMER_TABLE } = require('./customer.model');
const BITACORA_EVENT_TABLE = 'bitacoraEvents';

const BitacoraEventSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nameForm: {
    allowNull: false,
    type: DataTypes.STRING
  },
  activities: {
    type: DataTypes.JSONB,
    defaultValue: [],
    allowNull: true
  },
  bitacoraId: {
    type: DataTypes.INTEGER,
    references: {
      model: BITACORA_TABLE,
      key: 'id'
    },
    allowNull: false
  },
  creationDate: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  customerId: {
    field: 'customerId',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class BitacoraEvent extends Model {
  static associate(models) {
    this.belongsTo(models.Bitacora, { foreignKey: 'bitacoraId', as: 'bitacora' });
    this.belongsTo(models.Customer, { as: 'customer' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BITACORA_EVENT_TABLE,
      modelName: 'BitacoraEvent',
      timestamps: false,
      hooks: {
        beforeCreate: (bitacoraEvent) => {
          bitacoraEvent.creationDate = new Date();
        }
      }
    };
  }
}

module.exports = { BitacoraEvent, BitacoraEventSchema, BITACORA_EVENT_TABLE };
