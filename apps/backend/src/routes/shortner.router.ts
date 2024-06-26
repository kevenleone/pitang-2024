import ShortnerController from '../controllers/shortner.controller';
import { mixedRouter, publicRouter, privateRouter } from './router';

const shortnerController = new ShortnerController();

publicRouter.get('/:hash', (request, response) =>
  shortnerController.redirect(request, response)
);

privateRouter.get('/api/shortner', (request, response) =>
  shortnerController.index(request, response)
);

privateRouter.get('/api/shortner/:id', (request, response) =>
  shortnerController.getOne(request, response)
);

mixedRouter.post('/api/shortner', (request, response) =>
  shortnerController.store(request, response)
);

privateRouter.put('/api/shortner/:id', (request, response) =>
  shortnerController.update(request, response)
);

privateRouter.delete('/api/shortner/:id', (request, response) =>
  shortnerController.destroy(request, response)
);
