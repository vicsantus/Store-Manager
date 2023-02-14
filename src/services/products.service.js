const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const [product] = await productsModel.findById(productId);
  if (!product || product.length < 1) {
    return {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      }; 
    }

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateName(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const [newProduct] = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateById = async (productId, newName) => {
  let error = schema.validateId(productId);
  if (error.type) return error;

  error = schema.validateName(newName);
  if (error.type) return error;

  const [result] = await productsModel.updateById(productId, newName);
  if (!result.affectedRows || result.affectedRows < 1) {
    return {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      }; 
  }
  const [product] = await productsModel.findById(productId);

  return { type: null, message: product };
};

const deleteById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const [product] = await productsModel.deleteProduct(productId);
  if (!product.affectedRows || product.affectedRows < 1) {
    return {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      }; 
    }

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
  deleteById,
};