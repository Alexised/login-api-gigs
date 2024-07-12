'use strict';

const { USER_TABLE } = require('./../models/user.model');
const bcrypt = require('bcrypt');
module.exports = {

  up: async (queryInterface, Sequelize) => {
    // Primero, insertamos el rol de administrador

    // Luego, insertamos el usuario administrador
    const password = await bcrypt.hash('password123', 10)
    await queryInterface.bulkInsert(USER_TABLE, [{
      email: 'admin@admin.com', // Cambia esto por el correo electrónico deseado
      password: password, // Cambia esto por la contraseña deseada
      role_id: 1,
      create_at: new Date(),
    }], {});

    // Si necesitas realizar alguna otra acción en la base de datos, agrégala aquí
  },

  down: async (queryInterface) => {
    // Eliminamos el usuario administrador en el rollback
    await queryInterface.bulkDelete(USER_TABLE, {
      email: 'admin@admin.com' // Asegúrate de que coincida con el correo electrónico usado en la migración 'up'
    }, {});

    // Si necesitas realizar alguna otra acción en el rollback, agrégala aquí
  }
};
