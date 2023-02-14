const errorMap = require('../utils/errorMap');
const { salesService } = require('../services');

const createSalesProducts = async (req, res) => {
  const sales = req.body;
  
  const { type, message } = await salesService.createSalesProduct(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const findAllSalesProducts = async (req, res) => {
  const { type, message } = await salesService.findAllSalesProducts();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const findSalesProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSalesProductsById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createSalesProducts,
  findAllSalesProducts,
  findSalesProductsById,
};