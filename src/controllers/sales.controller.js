const errorMap = require('../utils/errorMap');
const { salesService } = require('../services');

const createSalesProducts = async (req, res) => {
  const sales = req.body;
  
  const { type, message } = await salesService.createSalesProduct(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSalesProducts,
};