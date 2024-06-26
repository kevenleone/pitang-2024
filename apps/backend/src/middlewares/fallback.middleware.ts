import {  NextFunction, Request, Response } from "express";
import AppError from "../exceptions/AppError";

export default function fallbackMiddleware(
  error: AppError, 
  request: Request, 
  response: Response, 
  next: NextFunction) {
  console.error(error.stack);

  // TODO:
  // Implementar uma template engine, que exibe uma página HTML com uma tela
  // amigável de error.

  // https://www.geeksforgeeks.org/express-js-res-render-function/

  const statusCode = error.statusCode || 500;

  response.status(statusCode).send({ message: error.message });
}
