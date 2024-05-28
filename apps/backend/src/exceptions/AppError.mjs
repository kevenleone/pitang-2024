export default class AppError extends Error {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    super(message);

    this.name = 'AppError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
