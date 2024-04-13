import { Api } from "src/interface/interface.js";

class ApiError extends Error implements Api {
  statusCode: number;
  data: any;
  success: boolean;
  override message: string;
  error: never[];
  override stack: any;
  constructor(
    statusCode: number,
    message: string,
    errors: never[] = [],
    stack: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
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
