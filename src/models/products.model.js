const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

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

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};