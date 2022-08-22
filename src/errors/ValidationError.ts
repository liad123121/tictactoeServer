import { CustomError } from "./customError";

export class ValidationError extends CustomError {
  statusCode = 400;
  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
