const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

const Fill_TABLE = 'fills';

const FillSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  codeInspectionCompany: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  nameForm: {
    allowNull: false,
    type: DataTypes.STRING
  },
  apto: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  codeForm: {
    allowNull: false,
    type: DataTypes.STRING
  },
  brand: {
    allowNull: false,
    type: DataTypes.STRING
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING
  },
  dateFirstUse: {
    allowNull: false,
    type: DataTypes.DATE
  },
  inspectionFrequency: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fabricationDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  purchasedate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  serialLotNumber: {
    allowNull: false,
    type: DataTypes.STRING
  },
  modelnumber: {
    allowNull: false,
    type: DataTypes.STRING
  },
  internalNumber: {
    allowNull: false,
    type: DataTypes.STRING
  },
  record: {
    allowNull: false,
    type: DataTypes.STRING
  },
  activities: {
    type: DataTypes.JSONB,
    defaultValue: [],
    allowNull: true
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  reviewedBy: {
    allowNull: false,
    type: DataTypes.STRING
  },
imageProduct: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  imageProduct2: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  idsignature: {
    allowNull: false,
    type: DataTypes.INTEGER, // Assuming the ID of signature is an integer
    references: {
      model: 'Signature', // Assuming the model name for Signature is 'Signature'
      key: 'id' // Assuming the primary key of Signature is 'id'
    }
  }
};

class Fill extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: Fill_TABLE,
      modelName: 'Fill',
      timestamps: false
    };
  }
}

module.exports = { Fill, FillSchema, Fill_TABLE };
