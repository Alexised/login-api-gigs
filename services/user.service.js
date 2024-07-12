const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      attributes: { exclude: ['password'] },
      include: ['customer']
    });
    return rta;
  }


  async findUsersByRoleId(roleId) {
    const users = await models.User.findAll({
      where: { roleId }, // Assuming roleId is the foreign key in User model
      attributes: { exclude: ['password','recoveryToken'] },
      include: ['customer']
    });
    return users.map(user => ({
      id: user.id,
      fullName: `${user.customer.name} ${user.customer.lastName}` // Access the virtual column
    }));
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const customer = await models.Customer.findOne({ where: { userId: id } });
    if (customer) {
      await models.Customer.destroy({ where: { id: customer.id } });
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
