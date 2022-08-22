export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract msg: string;

  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  sendMessage() {
    return { message: this.msg };
  }
}
