const { expect } = require("chai");
const sinon = require("sinon");
const { salesService, productService } = require("../../../src/services");
const {
  salesModel,
} = require("../../../src/models");

const {
  findAllSalesProducts,
  expecificIdMock,
  makeWrongOneMock,
  makeWrongTwoMock,
  makeWrongThreeMock,
  makeOkMock,
  returnPromise,
  makeOkAllMock,
} = require("./mocks/sales.service.mock");

describe("Verificando service de sales", function () {
  describe("listagem de all sales products", function () {
    it("retorna a lista completa de sales products", async function () {
      // arrange
      sinon
        .stub(salesModel, "findAllSalesProducts")
        .resolves(findAllSalesProducts);

      // act
      const result = await salesService.findAllSalesProducts();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(findAllSalesProducts);
    });
  });

  describe("busca de uma sale expecifica", function () {
    it("retorna um erro caso receba um ID inválido", async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await salesService.findSalesProductsById("a");

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna SALES_NOT_FOUND caso a sale não seja encontrada", async function () {
      // arrange
      sinon
        .stub(salesModel, "findExpecificSalesProductsById")
        .resolves(null);

      // act
      const result = await salesService.findSalesProductsById(1);

      // assert
      expect(result.type).to.equal("SALES_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("retorna a sale expecifica", async function () {
      // arrange
      sinon
        .stub(salesModel, "findExpecificSalesProductsById")
        .resolves(expecificIdMock);

      // act
      const result = await salesService.findSalesProductsById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal(expecificIdMock);
    });
  });

  describe("cria uma sale expecifica", function () {
    it("retorna um erro caso não receba um productId", async function () {
      // arrange

      // act
      const result = await salesService.createSalesProduct(makeWrongOneMock);

      // assert
      expect(result.type).to.equal("IS_REQUIRED");
      expect(result.message).to.equal('"productId" is required');
    });

    it("retorna um erro caso não receba um quantity", async function () {
      // arrange

      // act
      const result = await salesService.createSalesProduct(makeWrongTwoMock);

      // assert
      expect(result.type).to.equal("IS_REQUIRED");
      expect(result.message).to.equal('"quantity" is required');
    });

    it("retorna um erro caso receba um quantity menor que 1", async function () {
      // arrange

      // act
      const result = await salesService.createSalesProduct(makeWrongThreeMock);

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });

    it("retorna um erro caso receba um productid inexistente", async function () {
      // arrange
      sinon.stub(productService, "findById").resolves(returnPromise);

      // act
      const result = await salesService.createSalesProduct(makeOkMock);

      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna corretamente o que se pede", async function () {
      // arrange
      sinon.stub(salesModel, "insertSale").resolves(99);
      sinon.stub(salesModel, "insertSalesProducts").resolves(makeOkMock);
      sinon.stub(salesModel, "findSalesProductsById").resolves(makeOkMock);

      // act
      const result = await salesService.createSalesProduct(makeOkMock);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(makeOkAllMock);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
