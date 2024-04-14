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

  // when the object_id is not correctly enter error.name ==="CastError" can be change using the error.stack
  // Modified Error
  if (error.name === "CastError") {
    const message = `Resource not Found.Invalid : ${error.path}`;
    error = new ApiError(400, message);
  }
  return response
    .status(error.statusCode)
    .json(new ApiError(error.statusCode, error.message));
  next!();
};
