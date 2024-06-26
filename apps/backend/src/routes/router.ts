import { Router } from 'express';
import authMiddleware, {
  loggedUserMiddleware,
} from '../middlewares/auth.middleware.ts';

const mixedRouter = Router();
const publicRouter = Router();
const privateRouter = Router();

mixedRouter.use(loggedUserMiddleware);
privateRouter.use(authMiddleware);

export { mixedRouter, publicRouter, privateRouter };
