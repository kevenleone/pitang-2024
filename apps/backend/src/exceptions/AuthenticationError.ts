export default class AuthenticationError extends Error {
  public message: string;
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.name = 'AuthenticationError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
