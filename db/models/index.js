const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Role, RoleSchema } = require('./role.model');
const { Event, EventSchema } = require('./event.model');
const { BitacoraEvent, BitacoraEventSchema } = require('./bitacora-event.model')
const { Signature, SignatureSchema } = require('./signature.model');
const { Location, LocationSchema } = require('./location.model')
const { Bitacora, BitacoraSchema } = require('./bitacora.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Location.init(LocationSchema, Location.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Event.init(EventSchema, Event.config(sequelize));
  Bitacora.init(BitacoraSchema, Bitacora.config(sequelize));
  BitacoraEvent.init(BitacoraEventSchema, BitacoraEvent.config(sequelize));

  User.associate(sequelize.models);
  Location.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Role.associate(sequelize.models);
  Bitacora.associate(sequelize.models);
  BitacoraEvent.associate(sequelize.models);
}

module.exports = setupModels;
