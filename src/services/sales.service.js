const { salesModel } = require('../models');
const productService = require('./products.service');
const schema = require('./validations/validationsInputValues');
const { salesMiddlewares } = require('../middlewares');

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

const deleteSale = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;
  const respOne = await salesModel.deleteSaleProduct(saleId);
  const respTwo = await salesModel.deleteSale(saleId);

  if (respOne < 1 || respTwo < 1) {
    return {
      type: 'SALES_NOT_FOUND',
      message: 'Sale not found',
    };
  }

  return { type: null, message: '' };
};

const updateById = async (dataToUpdate, saleId) => {
  let error = schema.validateId(saleId);
  if (error.type) return error;

  error = await salesMiddlewares.validaProductsInSalesList(dataToUpdate, saleId);
  if (error !== undefined) return error;

  await salesModel.deleteSaleProduct(saleId);
  await salesModel.insertSalesProducts(dataToUpdate, saleId);

  const product = await salesModel.findSalesProductsById(saleId);

  return {
    type: null,
    message: { saleId, itemsUpdated: product },
  };
};

module.exports = {
  createSalesProduct,
  findAllSalesProducts,
  findSalesProductsById,
  deleteSale,
  updateById,
};