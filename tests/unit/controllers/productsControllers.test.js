// tests/unit/controllers/driver.controller.test.js

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");

describe("Teste de unidade do productController", function () {
  describe("Buscando todos os products", function () {
    it("quando encontra os produtos corretamente", async function () {
      // Este é o objeto de resposta (res) inicialmente é um objeto vazio
      // que será preenchido pelo express.
      const res = {};

      // Este é o objeto de requisição (req) que contém os dados necessários
      // para a requisição. Como a requisição é um GET não é esperado nenhum
      // dado durante a requisição.
      const req = {};

      // Criamos um stub para a função "res.status" que retorna o objeto res quando executada
      res.status = sinon.stub().returns(res);

      // Criamos um stub para a função "res.json" que não retorna nada
      res.json = sinon.stub().returns();

      // Criamos um stub para a chamada do service "productService.getWaitingDriverTravels" que irá
      // retornar uma resposta com um array vazio
      sinon
        .stub(productService, "findAll")
        .resolves({ type: null, message: [] });

      // Realizamos a chamada para o controller simulando o recebimento de uma requisição
      await productController.listAllProducts(req, res);

      // Validamos se o status code da resposta é igual a 200
      expect(res.status).to.have.been.calledWith(200);

      // Validamos se o json da resposta é igual a um array vazio
      expect(res.json).to.have.been.calledWith([]);
    });

    it("quando não encontra os produtos corretamente", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findAll")
        .resolves({ type: 'null', message: ['não funcionou'] });

      await productController.listAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(["não funcionou"]);
    });
  });

  describe("Buscando um produto expecifico", function () {
    it("quando encontra o produto corretamente", async function () {
      const res = {};
      const req = {params: {id: 1}};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findById")
        .resolves({ type: null, message: [] });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    it("quando não encontra o produto corretamente", async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findById")
        .resolves({ type: 'null', message: [] });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: [] });
    });
  });

  describe("Criando um produto expecifico", function () {
    it("quando cria o produto corretamente", async function () {
      const res = {};
      const req = { body: { name: 'Jéssica' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "createProduct")
        .resolves({ type: null, message: [] });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({});
    });

    it("quando não cria o produto corretamente", async function () {
      const res = {};
      const req = { body: { name: "Jéssica" } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "createProduct")
        .resolves({ type: 'null', message: [] });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: [] });
    });
  });

  describe("Atualizando um produto expecifico", function () {
    it("quando atualiza o produto corretamente", async function () {
      const res = {};
      const req = { body: { name: 'Jéssica' }, params: { id: 939393} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "updateById")
        .resolves({ type: null, message: [] });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({});
    });

    it("quando não atualiza o produto corretamente", async function () {
      const res = {};
      const req = { body: { name: "Jéssica" }, params: { id: 939393 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "updateById")
        .resolves({ type: 'null', message: [] });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: [] });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
