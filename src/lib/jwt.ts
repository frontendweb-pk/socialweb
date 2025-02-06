import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthError } from "./errors";

const DEFAULT_OPTIONS: SignOptions = {
  expiresIn: "1h",
};
export class Jwt {
  static sign(payload: JwtPayload, options: SignOptions = DEFAULT_OPTIONS) {
    return jwt.sign(payload, process.env.JWT_KEY!, options);
  }
  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
      if (err) {
        return new AuthError("Invalid token");
      }
      return decoded;
    });
  }
}
