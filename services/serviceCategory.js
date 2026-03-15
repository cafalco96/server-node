const { boom } = require('@hapi/boom')
// const getConnection = require('../libs/postgres')
const {models} = require('../libs/sequelize')

const getCategories = async () =>{
  const response = await models.Category.findAll()
  return response
}

const findCategoryById = async (id)=>{
 try {
  const category = await models.Category.findByPk(id, {
    include: ['Products']
  })
  if (!category) {
    throw boom.notFound('category not found')
  }
  return category
 } catch (error) {
  console.log(error)
 }
}

const createCategory = async (body) => {
  try {
    const newCategory = await models.Category.create(body)
    return newCategory
  } catch (error) {
    console.log(error)
  }
}

const updateCategory = async (id, body)=>{
  try {
    const category = await models.Category.findByPk(id)
    if (!category) {
      return {
        error: 'category not found'
      }
    }
    const response = await category.update(body)
    return {response}
  } catch (error) {
    console.log(error)
  }
}

const deleteCategory = async (id)=>{
  try {
    const category = await models.Category.findByPk(id)
    if (!category) {
      return {
        error: 'category not found'
      }
    }
    await category.destroy()
    return {
      message: 'Category delete',
      id
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}