const { expect } = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
const { productsModel } = require("../../../src/models");

const {
  allProducts,
  oneProduct,
  postOneProduct,
  notDeleteReturnMock,
  deleteReturnMock,
} = require("./mocks/products.service.mock");

describe("Verificando service de products", function () {
  describe("listagem de all products", function () {
    it("retorna a lista completa de sales products", async function () {
      // arrange
      sinon.stub(productsModel, "findAll").resolves(allProducts);

      // act
      const result = await productService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe("listagem de um product expecifico", function () {
    it("retorna a lista com um product de id 939393", async function () {
      // arrange
      sinon.stub(productsModel, "findById").resolves([oneProduct]);
      // act
      const result = await productService.findById(939393);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(oneProduct);
    });

    it("retorna um erro caso receba um ID inválido", async function () {
      // arrange

      // act
      const result = await productService.findById("a");

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna PRODUCT_NOT_FOUND caso o product não seja encontrada", async function () {
      // arrange
      sinon.stub(productsModel, "findById").resolves([null]);

      // act
      const result = await productService.findById(939393);

      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });
  });

  describe("insere um produto dentro do bd de produtos", function () {
    it("lista o produto que foi adicionado em products", async function () {
      // arrange
      sinon.stub(productsModel, "insert").resolves(postOneProduct);
      sinon.stub(productsModel, "findById").resolves([oneProduct]);

      // act
      const result = await productService.createProduct(postOneProduct.name);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(oneProduct);
    });

    it("retorna um erro caso não receba o name", async function () {
      // arrange

      // act
      const result = await productService.createProduct();

      // assert
      expect(result.type).to.equal("REQUIRED_NAME");
      expect(result.message).to.equal('"name" is required');
    });

    it("retorna um erro caso não receba 5 caracteres no nome", async function () {
      // arrange

      // act
      const result = await productService.createProduct('nom');

      // assert
      expect(result.type).to.equal("MIN_NAME_CHAR");
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });
  });

  describe("apaga um produto dentro do bd de produtos", function () {
    it("não encontra o produto e recebe um erro", async function () {
      // arrange
      sinon.stub(productsModel, "deleteProduct").resolves(notDeleteReturnMock);

      // act
      const result = await productService.deleteById(1);

      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna um erro caso esteja com id invalido", async function () {
      // arrange
      // sinon.stub(productsModel, "deleteProduct").resolves(notDeleteReturnMock);

      // act
      const result = await productService.deleteById('x');

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("encontra o produto e recebe um erro", async function () {
      // arrange
      sinon.stub(productsModel, "deleteProduct").resolves(deleteReturnMock);

      // act
      const result = await productService.deleteById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.equal("");
    });
  });

  describe("atualiza um produto dentro do bd de produtos", function () {
    it("não encontra o produto e recebe um erro", async function () {
      // arrange
      sinon.stub(productsModel, "updateById").resolves(notDeleteReturnMock);

      // act
      const result = await productService.updateById(939393, 'fdssf');

      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna um erro caso não receba um id valido", async function () {
      // arrange
      // sinon.stub(productsModel, "updateById").resolves(notDeleteReturnMock);

      // act
      const result = await productService.updateById('x', "nomemeno");

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna um erro caso não receba 5 caracteres no nome", async function () {
      // arrange
      // sinon.stub(productsModel, "updateById").resolves(notDeleteReturnMock);

      // act
      const result = await productService.updateById(939393, "nom");

      // assert
      expect(result.type).to.equal("MIN_NAME_CHAR");
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long'
      );
    });

    it("realiza o update corretamente e retorna o produto editado", async function () {
      // arrange
      sinon.stub(productsModel, "updateById").resolves(deleteReturnMock);
      sinon.stub(productsModel, "findById").resolves([oneProduct]);

      // act
      const result = await productService.updateById(939393, "nomemeno");

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(oneProduct);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
