import { Router } from 'express';
import authMiddleware, {
  loggedUserMiddleware,
} from '../middlewares/auth.middleware.mjs';

const mixedRouter = Router();
const publicRouter = Router();
const privateRouter = Router();

mixedRouter.use(loggedUserMiddleware);
privateRouter.use(authMiddleware);

export { mixedRouter, publicRouter, privateRouter };
