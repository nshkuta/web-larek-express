import { Joi, celebrate, Segments } from 'celebrate';

// Основная схема валидации заказа
const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
});

export const userRouteValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

const productSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(2)
    .max(30),
  image: Joi.object({
    fileName: Joi.string()
      .required(),
    originalName: Joi.string()
      .required(),
  }).required(),
  category: Joi.string()
    .required(),
  description: Joi.string(),
  price: Joi.number()
    .allow(null)
    .default(null),
});

export const productRouteValidator = celebrate({
  [Segments.BODY]: productSchema,
});
