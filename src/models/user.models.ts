import {model,Schema,Document} from 'mongoose'
import { User } from '../interfaces/user.interfaces'
const UserSchema : Schema = new Schema({
    email :{
        type : String,
        required : true
    },
    password :{
        type:String,
        required : true
    },
})
export const UserModel = model<User & Document>('User', UserSchema);