import { CustomError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode = 401;

  constructor(message: string = "Not authorized", public field?: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors() {
    return [
      { message: this.message, field: this.field, statusCode: this.statusCode },
    ];
  }
}
