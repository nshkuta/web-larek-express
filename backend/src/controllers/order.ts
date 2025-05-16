import { NextFunction, Request, Response } from 'express';
import { simpleFaker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';

// Функция для создания заказа
export default (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  return Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        return next(new NotFoundError('Некоторые товары не найдены'));
      }

      const totalPrice = products.reduce((acc, product) => {
        if (!product.price) {
          next(new Error('Товар не продается'));
          return 0;
        }
        return acc + product.price;
      }, 0);

      if (totalPrice !== total) {
        return next(
          new BadRequestError(
            'Общая сумма заказа не совпадает со стоимостью товаров',
          ),
        );
      }

      const orderId = simpleFaker.string.uuid();
      return res.status(201).json({
        status: 'success',
        data: {
          id: orderId,
          total: totalPrice,
        },
      });
    })
    .catch((error) => next(new Error(`Ошибка при создании заказа: ${error.message}`)));
};
