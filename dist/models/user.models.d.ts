import { Document } from 'mongoose';
import { User } from '../interfaces/user.interfaces';
export declare const UserModel: import("mongoose").Model<User & Document<unknown, any, any, Record<string, any>>, {}, {}, {}, Document<unknown, {}, User & Document<unknown, any, any, Record<string, any>>, {}> & User & Document<unknown, any, any, Record<string, any>> & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
