import { Response } from "express";
import { ClientError } from "../errors/client.error";
import { ServerError } from "../errors/server.error";

export default function errorHandler(error: Error, res: Response) {
  let statusCode = 500,
    message = "Unknown Error",
    prefix = "SERVER ERROR";

  if (error instanceof ClientError) {
    statusCode = error.statusCode;
    message = error.message;
    prefix = "CLIENT ERROR";
  } else if (error instanceof ServerError) {
    statusCode = error.statusCode;
    message = error.message;
    prefix = "SERVER ERROR";
  }

  const now = new Date();

  console.error(`${now.toISOString()} [${prefix}] ${error.message}`);

  return res.status(statusCode).json({
    statusCode,
    message,
  });
}
