export class ServerError extends Error {
  public readonly statusCode: number;

  constructor(message: string = "Internal error", statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
