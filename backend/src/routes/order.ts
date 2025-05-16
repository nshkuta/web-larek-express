import express from 'express';
import order from '../controllers/order';
import { userRouteValidator } from '../middlewares/validations';

const router = express.Router();

router.post('/', userRouteValidator, order);

export default router;
