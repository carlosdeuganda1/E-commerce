const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

// Private routes
router.post('/:id/reviews', protect, addReview);

// Admin routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
