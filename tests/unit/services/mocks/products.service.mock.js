const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const oneProduct = {
  id: 939393,
  name: "Martelo de Thor",
};

const postOneProduct = {
  name: "Martelo de Thor",
};

const notDeleteReturnMock = [
  {
    affectedRows: 0,
  },
];

const deleteReturnMock = [
  {
    affectedRows: 1,
  },
];

module.exports = {
  allProducts,
  oneProduct,
  postOneProduct,
  notDeleteReturnMock,
  deleteReturnMock,
};