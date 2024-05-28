import { Router } from 'express';
import UserController from '../controllers/user.controller.mjs';

const routes = Router();

const userController = new UserController();

routes.post('/api/auth', (request, response) =>
  userController.auth(request, response)
);

routes.get('/api/user', (request, response) =>
  userController.index(request, response)
);

routes.get('/api/user/:id', (request, response) =>
  userController.getOne(request, response)
);

routes.post('/api/user', (request, response) =>
  userController.store(request, response)
);

routes.put('/api/user/:id', (request, response) =>
  userController.update(request, response)
);

routes.delete('/api/user/:id', (request, response) =>
  userController.destroy(request, response)
);

export default routes;
