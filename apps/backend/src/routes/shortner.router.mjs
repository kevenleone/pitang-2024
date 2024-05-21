import { Router } from 'express';
import ShortnerController from '../controllers/shortner.controller.mjs';

const routes = Router();

const shortnerController = new ShortnerController();

routes.get('/:hash', (request, response) =>
  shortnerController.redirect(request, response)
);

routes.get('/api/shortner', (request, response) =>
  shortnerController.index(request, response)
);

routes.get('/api/shortner/:id', (request, response) =>
  shortnerController.getOne(request, response)
);

routes.post('/api/shortner', (request, response) =>
  shortnerController.store(request, response)
);

routes.put('/api/shortner/:id', (request, response) =>
  shortnerController.update(request, response)
);

routes.delete('/api/shortner/:id', (request, response) =>
  shortnerController.destroy(request, response)
);

export default routes;
