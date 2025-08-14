import { User } from "@/interfaces/user.interfaces";
import { UserModel } from "@/models/user.models";
const findByEmail = async (email : string,select ={
    email:1,password : 2,name :1,status : 1,roles :1}) : Promise<User> =>{
    return await UserModel.findOne({email}).select(select).lean();
}
const removeKeyById = async (id:string) :Promise<User> =>{
    return await UserModel.findByIdAndDelete(id)
}
export {findByEmail,removeKeyById}