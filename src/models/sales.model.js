const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

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

const findSalesProductsById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?;',
    [id],
  );
  return camelize(result);
};

const insertSalesProducts = async (sales, saleId) => {
  const [sale] = sales;
  const columns = Object.keys(snakeize(sale)).join(', ');

  const allSalesMap = sales.map((sal) => [saleId, ...Object.values(sal)]);
  const [result] = await connection.query(
    `INSERT INTO sales_products (sale_id, ${columns}) VALUE ?`,
    [allSalesMap],
  );
  
  return camelize(result);
};

module.exports = {
  findSaleById,
  insertSalesProducts,
  insertSale,
  findSalesProductsById,
};