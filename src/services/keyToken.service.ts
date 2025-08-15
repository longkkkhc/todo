import {keyTokenModel} from "../models/keyToken.models";
import{Types} from "mongoose"
class keyTokenService{

    
    static createKeytoken = async({userId,privateKey,publicKey,refreshToken}) => {
        try {
             if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userID format');
        ``  }
            const filter ={user: new Types.ObjectId(userId)},update ={
                publicKey,privateKey,refreshTokensUsed :[],refreshToken
            }, options = {upsert : true,new:true} // upsert: true là quan trọng
            const tokens = await keyTokenModel.findOneAndUpdate(filter,update,options)
            return tokens ? tokens.publicKey :null
        } catch (error) {
            console.error("Error in createKeytoken:", error); // Thêm log lỗi ở đây
            return null;
        }
    }


    static findByUserId =  async (userId ) =>{
        return await keyTokenModel.findOne({ user:(userId) });
    }
}
export default keyTokenService