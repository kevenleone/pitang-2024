import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import shortnerRoutes from './routes/shortner.router.mjs';
import userRoutes from './routes/user.router.mjs';
import fallbackMiddleware from './middlewares/fallback.middleware.mjs';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(shortnerRoutes);
server.use(userRoutes);
server.use(fallbackMiddleware);

server.use('*', (request, response) => {
  response.status(404).send({ message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Estou rodando na porta ${PORT}`);
});
