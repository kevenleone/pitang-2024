import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import AuthenticationTokenInvalid from '../exceptions/AuthenticationTokenInvalid';
import AuthenticationTokenMissing from '../exceptions/AuthenticationTokenMissing';
import env from '../utils/env';

type CustomRequest = Request & { logged_user: any };

export function loggedUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization = '' } = request.headers;

  const [, token] = authorization.split(' ');

  try {
    const jwt = jsonwebtoken.verify(token, env.JWT_SECRET);

    (request as CustomRequest).logged_user = jwt;
  } catch (error) {}

  next();
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AuthenticationTokenMissing('Token Missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const jwt = jsonwebtoken.verify(token, env.JWT_SECRET);

    (request as CustomRequest).logged_user = jwt;

    next();
  } catch (error) {
    if (error instanceof AuthenticationTokenMissing) {
      throw error;
    }

    throw new AuthenticationTokenInvalid((error as Error).name, 401);
  }
}
