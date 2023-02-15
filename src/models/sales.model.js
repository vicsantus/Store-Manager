const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insertSale = async () => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUE ()',
  );
  
  return insertId;
};

const findAllSalesProducts = async () => {
  const [result] = await connection.execute(
    `SELECT 
    SP.sale_id, S.date, SP.product_id, SP.quantity
FROM
    StoreManager.sales_products AS SP
        INNER JOIN
    StoreManager.sales AS S ON SP.sale_id = S.id`,
  );

  return camelize(result);
};

const findExpecificSalesProductsById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
    S.date, SP.product_id, SP.quantity
FROM
    StoreManager.sales_products AS SP
        INNER JOIN
    StoreManager.sales AS S ON SP.sale_id = S.id
WHERE
    SP.sale_id = ?;`,
    [id],
  );

  return camelize(result);
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

const deleteSaleProduct = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?;',
    [saleId],
  );
  return affectedRows;
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [saleId],
  );
  return affectedRows;
};

module.exports = {
  insertSalesProducts,
  insertSale,
  findSalesProductsById,
  findAllSalesProducts,
  findExpecificSalesProductsById,
  deleteSaleProduct,
  deleteSale,
};