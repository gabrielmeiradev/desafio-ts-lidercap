export class ClientError extends Error {
  public readonly statusCode: number;

  constructor(message: string = "Bad request", statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
