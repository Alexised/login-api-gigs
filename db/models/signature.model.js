const { Model, DataTypes, Sequelize } = require('sequelize');

const SIGNATURE_TABLE = 'signature';

const SignatureSchema = {
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
  forms: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  signature: {
    allowNull: false,
    type: DataTypes.TEXT
  }
};

class Signature extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: SIGNATURE_TABLE,
      modelName: 'Signature',
      timestamps: false
    };
  }
}

module.exports = { Signature, SignatureSchema, SIGNATURE_TABLE };
