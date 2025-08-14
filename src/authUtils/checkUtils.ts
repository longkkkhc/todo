import findbyId from "@/services/apikey.service";
import { Request, Response, NextFunction } from 'express';
const HEADER = {
    API_KEY :"x-api-key",
    AUTHORIZATION :"authorization",
}
const apikeyCheck = async(req: Request, res: Response, next: NextFunction) => {
    try {
         const key = req.headers[HEADER.API_KEY];
        console.log('x-api-key header:', key);
        if (!key) {
            return res.status(403).json({ message: 'Forbidden Error' });
        }
        // check objKey
        const keyString = key.toString()
        const objKey = await findbyId(keyString)
        if( !objKey)
        {
            return res.status(403).json({
                message :'Forbidden Error'
            })
        }
        (req as any).objKey = objKey;
        return next();
    } catch (error) {
        
    }
}
const permissions = (permissions) =>{

    console.log("==============================================")
    return (req,res,next) =>{
        if(!req.objKey.permissions){
            return res.status(403).json({
                message :'promissions denied'
            })
        }
        console.log('permissions :',req.objKey.permissions)
        const validPermission = req.objKey.permissions.includes(permissions)
        if(!validPermission){
            return res.status(403).json({
                message :'promissions denied'
            })
        }
        return next()
    }
}
export {
    apikeyCheck,
    permissions
}