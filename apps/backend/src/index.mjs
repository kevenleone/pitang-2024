import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import shortnerRoutes from './routes/shortner.router.mjs';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(shortnerRoutes);

server.use((error, request, response, next) => {
  console.error(error.stack);

  // TODO:
  // Implementar uma template engine, que exibe uma página HTML com uma tela
  // amigável de error.

  // https://www.geeksforgeeks.org/express-js-res-render-function/

  response.status(500).send({ message: error.message });
});

server.use('*', (request, response) => {
  response.status(404).send({ message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Estou rodando na porta ${PORT}`);
});
