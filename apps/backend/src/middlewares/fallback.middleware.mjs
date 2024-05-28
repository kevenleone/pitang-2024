export default function fallbackMiddleware(error, request, response, next) {
  console.error(error.stack);

  // TODO:
  // Implementar uma template engine, que exibe uma página HTML com uma tela
  // amigável de error.

  // https://www.geeksforgeeks.org/express-js-res-render-function/

  const statusCode = error.statusCode || 500;

  response.status(statusCode).send({ message: error.message });
}
