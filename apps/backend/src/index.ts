import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import fallbackMiddleware from './middlewares/fallback.middleware';
import { mixedRouter, privateRouter, publicRouter } from './routes/router';

import './routes/shortner.router.ts';
import './routes/user.router.ts';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(mixedRouter);
server.use(publicRouter);
server.use(privateRouter);
server.use(fallbackMiddleware);

server.use('*', (request, response) => {
  response.status(404).send({ message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Running Pitang Backend on PORT ${PORT}`);
});
