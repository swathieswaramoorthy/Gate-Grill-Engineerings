import express from 'express';
import { getProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

export default router;
