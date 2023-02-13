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
  console.log(product);
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

module.exports = {
  findAll,
  findById,
  createProduct,
};