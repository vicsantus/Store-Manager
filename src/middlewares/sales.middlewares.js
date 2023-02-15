const schema = require('../services/validations/validationsInputValues');
const productService = require('../services/products.service');
const { salesModel } = require('../models');

// const resolvePromisesSeq = async (tasks) => {
//   const results = [];
//   // console.log(tasks, '<======= tasks');
//   await Promise.all(tasks)
//     .then((task) => {
//       const x = task.map((ele) => ele[0]);
//       // console.log(x, '<========= prazer task');
//       results.push(x);
//     });
//   // console.log(results, '<=================== RESULTS DO MIDDLE');
//   return results;
// };

const validaProductsInSalesList = async (dataToUpdate, saleId) => {
  const error = schema.validateSales(dataToUpdate);
  if (error.type) return error;
  // console.log(typeof saleId);
  const sales = await salesModel.findSalesProductsById(saleId);
  // console.log(sales);
  if (!sales || sales.length < 1) {
    return {
      type: 'SALES_NOT_FOUND', message: 'Sale not found',
    };
  }
  const productsIdList = dataToUpdate.map((sale) => sale.productId);
  const listOfProducts = await Promise.all(
    productsIdList.map((id) => productService.findById(id)),
  );
  if (listOfProducts.some((product) => product.type !== null)) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
};

module.exports = {
  validaProductsInSalesList,
};