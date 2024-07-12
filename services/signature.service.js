
const { models } = require('../libs/sequelize');

class SignatureService {
  async createSignature(data) {
    try {
      const newSignature = await models.Signature.create(data);
      return newSignature;
    } catch (error) {
      throw new Error('Error al crear la firma');
    }
  }

  async deleteSignature(id) {
    try {
      const deletedSignature = await models.Signature.destroy({
        where: { id }
      });
      return deletedSignature;
    } catch (error) {
      throw new Error('Error al eliminar la firma');
    }
  }

  async updateSignature(id, data) {
    try {
      const updatedSignature = await models.Signature.update(data, {
        where: { id }
      });
      return updatedSignature;
    } catch (error) {
      throw new Error('Error al actualizar la firma');
    }
  }
  async findAll() {
    try {
      const signature = await models.Signature.findAll({
      });
      return signature;
    } catch (error) {
      throw new Error('Error al buscar las firmas', error);
    }
  }
}

module.exports = SignatureService;
