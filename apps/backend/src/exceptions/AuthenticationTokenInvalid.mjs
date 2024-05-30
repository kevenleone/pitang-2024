export default class AuthenticationTokenInvalid extends Error {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationTokenInvalid';
    this.message = message;
    this.statusCode = statusCode;
  }
}
