export default class AuthenticationTokenMissing extends Error {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationTokenMissing';
    this.message = message;
    this.statusCode = statusCode;
  }
}
