const sales = [
  {
    saleId: 1,
    date: "2023-02-14T18:36:26.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-02-14T18:36:26.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-02-14T18:36:26.000Z",
    productId: 3,
    quantity: 15,
  },
];

const salesWithOutDate = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
  {
    productId: 3,
    quantity: 15,
  },
];

const expecificSalesProducts = [
  {
    date: "2023-02-14T18:36:26.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-02-14T18:36:26.000Z",
    productId: 2,
    quantity: 10,
  },
];

const findSalesPById = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  sales,
  expecificSalesProducts,
  findSalesPById,
  salesWithOutDate,
};
