const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require("../../../src/models");

const connection = require("../../../src/models/connection");
const {
  findAll,
  findById,
  updateReturn,
  insertMock,
} = require("./mocks/products.model.mock");

describe("Testes de unidade do model de productsModel", function () {
  it("Recuperando a lista de findAll", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([findAll]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(findAll);
  });

  it("Recuperando a lista de findById", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([findById]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(findById);
  });

  it("Recuperando o valor de updateById", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves(updateReturn);
    // Act
    const result = await productsModel.updateById(1, 'Carnaval');
    // Assert
    expect(result).to.be.deep.equal(updateReturn);
  });

  it("Recuperando a lista de deleteProduct", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves(updateReturn);
    // Act
    const result = await productsModel.deleteProduct(1);
    // Assert
    expect(result).to.be.deep.equal(updateReturn);
  });

  it("Recuperando a lista de insert", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    // Act
    const result = await productsModel.insert(insertMock);
    // Assert
    expect(result).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
