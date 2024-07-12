const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Role, RoleSchema } = require('./role.model');
const { Event, EventSchema } = require('./event.model');
const { Fill, FillSchema } = require('./fill.model');
const { Signature, SignatureSchema } = require('./signature.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Event.init(EventSchema, Event.config(sequelize));
  Fill.init(FillSchema, Fill.config(sequelize));
  Signature.init(SignatureSchema, Signature.config(sequelize));
}

module.exports = setupModels;
