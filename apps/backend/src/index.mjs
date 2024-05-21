import express from 'express';

import shortnerRoutes from './routes/shortner.router.mjs';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(express.json());
server.use(shortnerRoutes);

server.listen(PORT, () => {
  console.log(`Estou rodando na porta ${PORT}`);
});
