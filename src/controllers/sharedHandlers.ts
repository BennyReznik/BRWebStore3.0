import { Request, Response, NextFunction } from "express";

const checkIfIdIsNumber = (
  req: Request,
  res: Response,
  next?: NextFunction
): Promise<any> => {
  if (isNaN(req.params.id)) {
    const err = new Error("id is not a number");
    err.name = "400";
    if (next) {
      next(err);
    }
  } else {
    if (next) {
      next();
    }
  }

  return Promise.resolve();
};

export { checkIfIdIsNumber };
