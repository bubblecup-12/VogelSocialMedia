import { JwtPayload } from "../tokens";

export {};
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
