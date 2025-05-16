import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';

// Функция для получения всех товаров
export const getAllProducts = (_req: Request, res: Response, next: NextFunction) => Product.find()
  .then((products) => {
    res.status(200).json({
      status: 'success',
      items: products,
      total: products.length,
    });
  })
  .catch((error) => next(new Error(`Ошибка при получении товаров${error.message}`)));

// Функция для создания товара
export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  return Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((createdProduct) => {
      const { _id } = createdProduct;
      res.status(201).json({
        status: 'success',
        data: _id,
      });
    })
    .catch((error) => next(new Error(`Ошибка при создании товара${error.message}`)));
};
