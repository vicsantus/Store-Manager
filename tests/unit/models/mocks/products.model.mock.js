const findById = {
  id: 1,
  name: "Martelo de Thor",
};

const findAll = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
];

const insertMock = {
  name: "ProdutoX",
};

const updateReturn = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
  undefined
]

module.exports = {
  findById,
  findAll,
  insertMock,
  updateReturn,
};
