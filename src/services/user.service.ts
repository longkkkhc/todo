import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import { Service } from 'typedi';
import { createKeypair } from '@authUtils/authUtils';
import{randomBytes} from 'crypto';
import { HttpException } from '@core/httpException';
import { User } from '@interfaces/user.interfaces';
import { UserModel } from '@models/user.models';
import {findByEmail,removeKeyById} from '@services/auth.service';
import keyTokenService from '@services/keyToken.service';

@Service()
export class UserService {
  static async signup (email:String, password:string): Promise<{ user: User; tokens: any }> {
    const existingUser = await UserModel.findOne({email}).lean();
    if(existingUser) {
      throw new HttpException(409, 'User already exists');
    }
    if(!password){
      throw new HttpException(400, 'Password is required');
    }
    const hashedPassword = await hash(password, 10);
    const publicKey = randomBytes(64).toString('hex');
    const privateKey = randomBytes(64).toString('hex');
    console.log(publicKey,privateKey)
    const userTodo = await UserModel.create({
      email,
      password: hashedPassword,
      publicKey,
      privateKey
    })
    const tokens = await createKeypair(userTodo._id,publicKey,privateKey)
    return {
      user : userTodo.toObject(),
      tokens  
    }
  }
  static login = async(email : string,password : string): Promise<{ user: User; tokens: any }> =>{
    const foundTodo = await findByEmail(email);
    if(!foundTodo){
      throw new HttpException(404,"User not found")
    }
    const match = await compare(password,foundTodo.password);
    if(!match){
      throw new HttpException(401,"Invalid password")
    }
    const publicKey = randomBytes(64).toString('hex');
    const privateKey = randomBytes(64).toString('hex');
    const userId = foundTodo._id;
     const tokens = await createKeypair(userId,publicKey,privateKey);
    await keyTokenService.createKeytoken({
        userId: userId.toString(), 
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken
    });
   
    return {
      user : foundTodo,
      tokens
    }
  }
  static logout = async(userId : string) :Promise<{message : string}> =>{
    if (!userId) {
      throw new HttpException(400, 'User ID is required');
    }
    const removed = await removeKeyById(userId); // Hàm này sẽ xóa publicKey/privateKey khỏi DB
    if (!removed) {
      throw new HttpException(404, 'User not found or already logged out');
    }
    return {message :'logout successfully'}

  }
}
