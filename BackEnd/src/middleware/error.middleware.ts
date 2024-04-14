import { Request, Response, NextFunction } from "express";
import { ExtendError } from "../interface/interface.js";
import ApiError from "../util/ApiError.js";

export const Error = (
  error: ExtendError,
  _request: Request,
  response: Response,
  next: NextFunction
): Response => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  return response
    .status(error.statusCode)
    .json(new ApiError(error.statusCode, error.message));
  next!();
};
