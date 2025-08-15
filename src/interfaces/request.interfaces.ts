import { ApiKey } from "./apikey.interfaces"
import { JwtPayload } from "jsonwebtoken";
import { KeyToken } from "./keyToken.interfaces";
export interface JwtUserPayload extends JwtPayload {
  userId: string;
}
declare global {
  namespace Express {
    export interface Request {
      user?: JwtUserPayload | KeyToken;
      todo?: KeyToken;
      objKey?: ApiKey;
    }
  }
}