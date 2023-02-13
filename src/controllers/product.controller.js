const errorMap = require('../utils/errorMap');
const { productService } = require('../services');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productService.findAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  console.log(message);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createPassenger = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json({ ...message });
};

module.exports = {
  listAllProducts,
  getProduct,
  createPassenger,
};