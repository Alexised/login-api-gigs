const { Model, DataTypes, Sequelize } = require('sequelize');

const COMPANY_TABLE = 'companies';

const CompanySchema = {
  id: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  businessName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING
  },
  department: {
    allowNull: false,
    type: DataTypes.STRING
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING
  },
  idType: {
    allowNull: false,
    type: DataTypes.STRING
  },
  idNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  verificationDigit: {
    allowNull: true,
    type: DataTypes.STRING
  },
  logo: {
    allowNull: true,
    type: DataTypes.BLOB
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
};

class Company extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPANY_TABLE,
      modelName: 'Company',
      timestamps: false
    };
  }
}

module.exports = { Company, CompanySchema, COMPANY_TABLE };
