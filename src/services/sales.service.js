const { salesModel } = require('../models');
const productService = require('./products.service');
const schema = require('./validations/validationsInputValues');

// const findAll = async () => {
//   const products = await productsModel.findAll();
//   return { type: null, message: products };
// };

// const findById = async (productId) => {
//   const error = schema.validateId(productId);
//   if (error.type) return error;

//   const [product] = await productsModel.findById(productId);
//   if (!product || product.length < 1) {
//     return {
//         type: 'PRODUCT_NOT_FOUND',
//         message: 'Product not found',
//       }; 
//     }

//   return { type: null, message: product };
// };

// eslint-disable-next-line max-lines-per-function
const createSalesProduct = async (sales) => {
  const error = schema.validateSales(sales);
  if (error.type) return error;
  const productsIdList = sales.map((sale) => sale.productId);
  const listOfProducts = await Promise
    .all(productsIdList
    .map((id) => productService.findById(id)));
  if (listOfProducts.some((product) => product.type !== null)) {
    return {
        type: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
      }; 
    }
  const newSaleId = await salesModel.insertSale();
  sales.forEach(async (sale) => {
    await salesModel.insertSalesProducts(sale, newSaleId);
  });
  return { type: null, message: { id: newSaleId, itemsSold: sales } };
};

module.exports = {
  // findAll,
  // findById,
  createSalesProduct,
};