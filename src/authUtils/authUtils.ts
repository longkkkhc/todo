
import {sign, verify} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../helper/asyncHandler';
import { AuthFailureError,BadRequestError,NotFoundError } from '../constants/error.constants';
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
        throw new AuthFailureError('Forbidden Error');
    }
    const todo = await keyTokenService.findByUserId(userId)
    if (!todo) {
        throw new AuthFailureError('Forbidden Error');
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
    throw new AuthFailureError('Forbidden Error');
  }

  try {
    const decodeUser = verify(accessToken, todo.publicKey);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Forbidden Error');
    }
    req.todo = todo;
    req.user = decodeUser;
    return next();
  } catch (err) {
    console.error("JWT verification error:", err);
    throw new AuthFailureError('Forbidden Error');
  }
})

export  {createKeypair,authorization}