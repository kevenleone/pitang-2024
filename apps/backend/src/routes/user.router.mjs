import UserController from '../controllers/user.controller.mjs';
import { publicRouter, privateRouter } from './router.mjs';

const userController = new UserController();

publicRouter.post('/api/auth', (request, response) =>
  userController.auth(request, response)
);

privateRouter.get('/api/user', (request, response) =>
  userController.index(request, response)
);

privateRouter.get('/api/user/:id', (request, response) =>
  userController.getOne(request, response)
);

publicRouter.post('/api/user', (request, response) =>
  userController.store(request, response)
);

privateRouter.put('/api/user/:id', (request, response) =>
  userController.update(request, response)
);

privateRouter.delete('/api/user/:id', (request, response) =>
  userController.destroy(request, response)
);
