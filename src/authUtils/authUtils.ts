
import {sign, verify} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../helper/asyncHandler';
import { HttpException } from '../core/httpException';
import keyTokenService from '../services/keyToken.service'
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
const authorization = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
        throw new HttpException(403, 'Forbidden Error');
    }
    const todo = await keyTokenService.findByUserId(userId)
    if (!todo) {
        throw new HttpException(403, 'Forbidden Error');
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
    throw new HttpException(403, 'Forbidden Error');
  }

  try {
    const decodeUser = verify(accessToken, todo.publicKey);
    if (userId !== decodeUser.userId) {
      throw new HttpException(403, 'Forbidden Error');
    }
    (req as any).todo = todo;
    (req as any).user = decodeUser;
    return next();
  } catch (err) {
    console.error("JWT verification error:", err);
    throw new HttpException(403, 'Forbidden Error');
  }
})
export  {createKeypair,authorization}