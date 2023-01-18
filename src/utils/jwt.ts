import jwt from "jsonwebtoken";

export class JWT {
  public generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  }

  public verifyToken(token: string): object | string {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
