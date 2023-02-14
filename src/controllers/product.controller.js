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

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  
  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json({ ...message });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const { type, message } = await productService.updateById(id, name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json({ ...message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.sendStatus(204);
};

module.exports = {
  listAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};