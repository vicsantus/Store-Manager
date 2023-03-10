const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listAllProducts);

router.get('/search', productController.findByQuery);

router.get('/:id', productController.getProduct);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
