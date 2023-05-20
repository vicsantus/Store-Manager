const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');
require('dotenv').config();

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result); 
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return camelize(result); 
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const updateById = async (productId, nameToUpdate) => 
   connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;',
    [nameToUpdate, productId],
  );

const deleteProduct = async (productId) => 
  connection.execute(
  'DELETE FROM products WHERE id = ?;',
  [productId],
  );

const findByQuery = async (query) => {
  const [result] = await connection.execute(
    `SELECT * FROM ${process.env.MYSQL_DATABASE 
      || 'StoreManager'}.products WHERE name LIKE ?;`, [`${query}%`],
  );
  return camelize(result);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteProduct,
  findByQuery,
};