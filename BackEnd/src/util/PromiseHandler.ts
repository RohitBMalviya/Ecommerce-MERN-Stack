import { Request, Response, NextFunction } from "express";

export default function PromiseHandler(
  func: (request: Request, response: Response, next: NextFunction) => any
) {
  return (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(func(request, response, next)).catch((error: Error) =>
      next(error)
    );
  };
}
