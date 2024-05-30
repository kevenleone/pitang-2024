import jsonwebtoken from 'jsonwebtoken';

import AuthenticationTokenInvalid from '../exceptions/AuthenticationTokenInvalid.mjs';
import AuthenticationTokenMissing from '../exceptions/AuthenticationTokenMissing.mjs';
import env from '../utils/env.mjs';

export default function authMiddleware(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AuthenticationTokenMissing('Token Missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const jwt = jsonwebtoken.verify(token, env.JWT_SECRET);

    request.logged_user = jwt;

    next();
  } catch (error) {
    throw new AuthenticationTokenInvalid(error.name, 401);
  }
}
