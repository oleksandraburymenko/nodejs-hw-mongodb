import express  from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth.js';
import contactRouter from './routers/contacts.js';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


dotenv.config();
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  
  const app = express();
  
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },}),);
  app.use(authRouter);   
  app.use(contactRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};