import express from 'express';
import bodyParser from 'body-parser';
import order from '../controllers/order';
import { userRouteValidator } from '../middlewares/validations';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/', userRouteValidator, order);

export default router;
