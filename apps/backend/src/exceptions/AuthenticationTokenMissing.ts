export default class AuthenticationTokenMissing extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationTokenMissing';
    this.message = message;
    this.statusCode = statusCode;
  }
}
