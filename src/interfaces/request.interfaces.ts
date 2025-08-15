import { Request } from "express";
import { ApiKey } from "./apikey.interfaces";
import { KeyToken } from "./keyToken.interfaces";
import { JwtPayload } from "jsonwebtoken";

export interface JwtUserPayload extends JwtPayload {
  userId: string;
}

export interface RequestWithUser extends Request {
  user?: JwtUserPayload | KeyToken;
  todo?: KeyToken;
  objKey?: ApiKey;
}
