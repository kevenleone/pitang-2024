export default class AuthenticationError extends Error {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
