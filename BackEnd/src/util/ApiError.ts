import { Api } from "../interface/interface.js";

class ApiError extends Error implements Api {
  statusCode: number;
  data: any;
  success: boolean;
  // override message: string;
  error: { [key: string]: string | number }[]; // OR
  // error: never[];
  override stack: any;
  constructor(
    statusCode: number,
    message: string,
    stack?: any,
    errors: { [key: string]: string | number }[] = [
      { MessageError: message },
      { StatusCode: statusCode },
    ] // OR
    // errors: never[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    // this.message = message;
    this.error = errors;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.stack);
    }
  }
}

export default ApiError;
