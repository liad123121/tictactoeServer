import { CustomError } from "./customError";

export class DBConnectionError extends CustomError {
  statusCode = 500;
  constructor(public msg: string) {
    super();
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }
}
