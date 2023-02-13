const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listAllProducts);

router.get('/:id', productController.getProduct);

module.exports = router;
