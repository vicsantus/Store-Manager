const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

// router.get('/', productController.listAllProducts);

// router.get('/:id', productController.getProduct);

router.post('/', salesController.createSalesProducts);

router.get('/', salesController.findAllSalesProducts);

router.get('/:id', salesController.findSalesProductsById);

module.exports = router;
