const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

// const findAll = async () => {
//   const [result] = await connection.execute(
//     'SELECT * FROM products',
//   );
//   return camelize(result); 
// };

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return camelize(result); 
};

const insertSale = async () => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUE ()',
  );
  
  return insertId;
};

const insertSalesProducts = async (sale, saleId) => {
   const columns = Object.keys(snakeize(sale)).join(', ');

  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
    [saleId, ...Object.values(sale)],
  );

  return insertId;
};

module.exports = {
  // findAll,
  findSaleById,
  insertSalesProducts,
  insertSale,
};