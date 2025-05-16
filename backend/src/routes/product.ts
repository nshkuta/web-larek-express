import express from 'express';
import { getAllProducts, createProduct } from '../controllers/product';
import { productRouteValidator } from '../middlewares/validations';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', productRouteValidator, createProduct);

export default router;
