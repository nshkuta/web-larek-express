import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const dbAddress = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

mongoose
  .connect(dbAddress)
  .then(() => {
    console.log('Connected to MongoDB');

    console.log(path.join(__dirname, 'public'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(requestLogger);

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/product', productRouter);
    app.use('/order', orderRouter);

    app.get('/', (_req, res) => {
      res.send('Hello, Express server is running!');
    });

    app.use(errorLogger);
    app.use(errorHandler);

    // Запуск сервера только после успешного подключения к БД
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Завершаем процесс при ошибке подключения
  });
