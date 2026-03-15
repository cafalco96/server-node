const { pool } = require('../libs/postgres');
const { models } = require('../libs/sequelize');

const getAllUsers = async () => {
  // const {limit, offset} = req.query;
  // if (limit && offset) {
  //   res.json({
  //     'limit': limit,
  //     'offset': offset
  //   });
  // } else {
  //   res.status(400).send('Faltan parámetros limit y offset');
  // }
  const response = await models.User.findAll({
    include: ['Client']
  });
  return response;
};

const getUserById = async (id) => {
  try {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw Boom.notFound(`Usuario con id ${id} no encontrado`);
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (body) => {
  try {
    const newUser = await models.User.create(body);
    return {
      message: 'Usuario creado exitosamente',
      user: newUser
    }
  } catch (error) {
    console.log(erro);
  }
};

const updateUser = async (id, body) => {
  try {
    const user = await models.User.findByPk(id);
    if (!user) {
      return {
        message: `Usuario con id ${id} no encontrado`
      }
    }
    const response = await user.update(body);
    return {
      message: `Usuario con id ${id} actualizado`,
      user: response
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (id) => {
  try {
    const user = await models.User.findOne(id);
    if (!user) {
      return {
        message: `Usuario con id ${id} no encontrado`
      }
    }
    await user.destroy();
    return {
      message: `Usuario con id ${id} eliminado`
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById
};
  