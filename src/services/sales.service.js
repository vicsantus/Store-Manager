const { salesModel } = require('../models');
const productService = require('./products.service');
const schema = require('./validations/validationsInputValues');

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
  await salesModel.insertSalesProducts(sales, newSaleId);
  const newSalesProducts = await salesModel.findSalesProductsById(newSaleId);
  return { type: null, message: { id: newSaleId, itemsSold: newSalesProducts } };
};

const findAllSalesProducts = async () => {
  const salesProducts = await salesModel.findAllSalesProducts();
  return { type: null, message: salesProducts };
};

const findSalesProductsById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sales = await salesModel.findExpecificSalesProductsById(saleId);
  if (!sales || sales.length < 1) {
    return {
        type: 'SALES_NOT_FOUND',
        message: 'Sale not found',
      }; 
    }

  return { type: null, message: sales };
};

module.exports = {
  createSalesProduct,
  findAllSalesProducts,
  findSalesProductsById,
};