
import {sign, verify} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../helper/asyncHandler';
import { AuthFailureError,BadRequestError,NotFoundError } from '../constants/error.constants';
import keyTokenService from '../services/keyToken.service'
import { RequestWithUser } from '../interfaces/request.interfaces';
import { access } from 'fs';
const HEADER = {
    API_KEY :"x-api-key",
    CLIENT_ID: "x-client-id",
    AUTHORIZATION :"authorization",
}

const createKeypair = async (payload : Object,publickey : string,privateKey : string) =>{
    try {
        const accessToken = await sign(payload,publickey,{
            expiresIn : "2days"
        })
        const refreshToken = await sign(payload,privateKey,{
            expiresIn : "7days"
        })
        const decode = await verify(accessToken,publickey)
        console.log(decode)
        return {accessToken,refreshToken}
    } catch (error) {
        
    }
}


const authorization = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers[HEADER.CLIENT_ID] as string;
    if (!userId) {
      return res.status(403).json({ message: "Forbidden Error: Missing client ID" });
    }

    const keyToken = await keyTokenService.findByUserId(userId);
    if (!keyToken) {
      return res.status(403).json({ message: "Forbidden Error: Key token not found" });
    }

    req.todo = keyToken; 
    req.user = { userId } as any; 

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export  {createKeypair,authorization}