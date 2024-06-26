export default class AuthenticationTokenInvalid extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationTokenInvalid';
    this.message = message;
    this.statusCode = statusCode;
  }
}
