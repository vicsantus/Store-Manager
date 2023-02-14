const findAllSalesProducts = [
  {
    saleId: 1,
    date: "2023-02-14T19:53:32.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-02-14T19:53:32.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-02-14T19:53:32.000Z",
    productId: 3,
    quantity: 15,
  },
];

const expecificIdMock = [
  {
    date: "2023-02-14T21:28:42.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-02-14T21:28:42.000Z",
    productId: 2,
    quantity: 10,
  },
];

const saleProductsSchemaMock = {
  error: {
    details: [
      {
        message: "erro de required",
        type: "any.required",
      },
      undefined,
    ],
  },
};

const makeWrongOneMock = [
  {
    productI: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const makeWrongTwoMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantit: 5,
  },
];

const makeWrongThreeMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 0,
  },
];

const makeOkMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const makeOkAllMock = {
  id: 99,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const returnPromise = [
  {
    type: null,
    message: "Ok",
  },
  {
    type: 'notNull',
    message: "Not Ok",
  },
];

module.exports = {
  findAllSalesProducts,
  saleProductsSchemaMock,
  expecificIdMock,
  makeWrongOneMock,
  makeWrongTwoMock,
  makeWrongThreeMock,
  makeOkMock,
  returnPromise,
  makeOkAllMock,
};
