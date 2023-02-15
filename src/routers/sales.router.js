const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.createSalesProducts);

router.get('/', salesController.findAllSalesProducts);

router.get('/:id', salesController.findSalesProductsById);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', salesController.updateById);

module.exports = router;
