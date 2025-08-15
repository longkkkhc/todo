import findbyId from "../services/apikey.service";
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from "../interfaces/request.interfaces";
import findById from "../services/apikey.service";
const HEADER = {
    API_KEY :"x-api-key",
    AUTHORIZATION :"authorization",
}
const apikeyCheck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY];
    console.log("x-api-key header:", key);

    if (!key) {
      return res.status(403).json({ message: "Forbidden Error: Missing API key" });
    }

    const objKey = await findById(key.toString());
    if (!objKey) {
      return res.status(403).json({ message: "Forbidden Error: Invalid API key" });
    }

    req.objKey = objKey;
    next();
  } catch (error) {
    console.error("API key check error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Middleware kiểm tra permissions
 */
const permissions = (requiredPermission: string) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions) {
      return res.status(403).json({ message: "Permissions denied" });
    }

    console.log("Permissions:", req.objKey.permissions);
    const hasPermission = req.objKey.permissions.includes(requiredPermission);

    if (!hasPermission) {
      return res.status(403).json({ message: "Permissions denied" });
    }

    next();
  };
};
export {
    apikeyCheck,
    permissions
}