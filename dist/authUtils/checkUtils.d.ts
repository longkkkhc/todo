import { Request, Response, NextFunction } from 'express';
declare const apikeyCheck: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const permissions: (permissions: any) => (req: any, res: any, next: any) => any;
export { apikeyCheck, permissions };
