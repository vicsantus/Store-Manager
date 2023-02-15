const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");

describe("Teste de unidade do salesController", function () {
  describe("Buscando todos os sales", function () {
    it("quando encontra os sales corretamente", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findAllSalesProducts")
        .resolves({ type: null, message: [] });

      await salesController.findAllSalesProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    it("quando não encontra os sales corretamente", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findAllSalesProducts")
        .resolves({ type: "null", message: ["não funcionou"] });

      await salesController.findAllSalesProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: ["não funcionou"] });
    });
  });

  describe("Buscando um sale expecifico", function () {
    it("quando encontra o sale corretamente", async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findSalesProductsById")
        .resolves({ type: null, message: [] });

      await salesController.findSalesProductsById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([]);
    });

    it("quando não encontra o sale corretamente", async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "findSalesProductsById")
        .resolves({ type: "null", message: [] });

      await salesController.findSalesProductsById(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: [] });
    });
  });

  describe("Criando um sale expecifico", function () {
    it("quando cria o sale corretamente", async function () {
      const res = {};
      const req = { body: { name: "Jéssica" } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createSalesProduct")
        .resolves({ type: null, message: [] });

      await salesController.createSalesProducts(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith([]);
    });

    it("quando não cria o sale corretamente", async function () {
      const res = {};
      const req = { body: { name: "Jéssica" } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createSalesProduct")
        .resolves({ type: "null", message: [] });

      await salesController.createSalesProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith({ message: [] });
    });
  });

  // describe("Atualizando um sale expecifico", function () {
  //   it("quando atualiza o sale corretamente", async function () {
  //     const res = {};
  //     const req = { body: { name: "Jéssica" }, params: { id: 939393 } };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon
  //       .stub(salesService, "updateById")
  //       .resolves({ type: null, message: [] });

  //     await salesController.updateProduct(req, res);

  //     expect(res.status).to.have.been.calledWith(200);
  //     expect(res.json).to.have.been.calledWith({});
  //   });

  //   it("quando não atualiza o sale corretamente", async function () {
  //     const res = {};
  //     const req = { body: { name: "Jéssica" }, params: { id: 939393 } };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon
  //       .stub(salesService, "updateById")
  //       .resolves({ type: "null", message: [] });

  //     await salesController.updateProduct(req, res);

  //     expect(res.status).to.have.been.calledWith(500);
  //     expect(res.json).to.have.been.calledWith({ message: [] });
  //   });
  // });

  // describe("Deleta um sale expecifico", function () {
  //   it("quando deleta o sale corretamente", async function () {
  //     const res = {};
  //     const req = { params: { id: 939393 } };
  //     res.sendStatus = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon
  //       .stub(salesService, "deleteById")
  //       .resolves({ type: null, message: [] });

  //     await salesController.deleteProduct(req, res);

  //     expect(res.sendStatus).to.have.been.calledWith(204);
  //   });

  //   it("quando não deleta o sale corretamente", async function () {
  //     const res = {};
  //     const req = { params: { id: 939393 } };
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //     sinon
  //       .stub(salesService, "deleteById")
  //       .resolves({ type: "null", message: [] });

  //     await salesController.deleteProduct(req, res);

  //     expect(res.status).to.have.been.calledWith(500);
  //     expect(res.json).to.have.been.calledWith({ message: [] });
  //   });
  // });

  afterEach(function () {
    sinon.restore();
  });
});
