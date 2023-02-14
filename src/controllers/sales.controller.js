const errorMap = require('../utils/errorMap');
const { salesService } = require('../services');

// const listAllProducts = async (_req, res) => {
//   const { type, message } = await productService.findAll();
//   if (type) return res.status(errorMap.mapError(type)).json(message);

//   return res.status(200).json(message);
// };

// const getProduct = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await productService.findById(id);

//   if (type) return res.status(errorMap.mapError(type)).json({ message });

//   return res.status(200).json(message);
// };

const createSalesProducts = async (req, res) => {
  const sales = req.body;
  
  const { type, message } = await salesService.createSalesProduct(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSalesProducts,
};