const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const {
  sales,
  expecificSalesProducts,
  findSalesPById,
  salesWithOutDate,
} = require("./mocks/sales.model.mock");

describe('Testes de unidade do model de sales', function () {
  it('Recuperando a lista de findAllSalesProducts', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.findAllSalesProducts();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando a lista de findExpecificSalesProductsById', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([expecificSalesProducts]);
    // Act
    const result = await salesModel.findExpecificSalesProductsById();
    // Assert
    expect(result).to.be.deep.equal(expecificSalesProducts);
  });

  it('Recuperando o valor de insertSale', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    // Act
    const result = await salesModel.insertSale();
    // Assert
    expect(result).to.equal(1);
  });

  it('Recuperando a lista de findSalesProductsById', async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([findSalesPById]);
    // Act
    const result = await salesModel.findSalesProductsById();
    // Assert
    expect(result).to.be.deep.equal(findSalesPById);
  });

  it("Recuperando a lista de insertSalesProducts", async function () {
    // Arrange
    sinon.stub(connection, "query").resolves([expecificSalesProducts]);
    // Act
    const result = await salesModel.insertSalesProducts(salesWithOutDate, 4);
    // Assert
    expect(result).to.be.deep.equal(expecificSalesProducts);
  });

  afterEach(function () {
    sinon.restore();
  });
});