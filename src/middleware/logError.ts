import { Request, Response, NextFunction } from "express";

export function logError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // tslint:disable-next-line: no-console
  console.log(error.message, error.stack);
  if (error.name === "400") {
    res.status(400).send(error.message);
  } else {
    next(error);
  }
}
