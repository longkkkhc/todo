import { Document } from 'mongoose';
import { ApiKey } from '../interfaces/apikey.interfaces';
export declare const apikeyModel: import("mongoose").Model<ApiKey & Document<unknown, any, any, Record<string, any>>, {}, {}, {}, Document<unknown, {}, ApiKey & Document<unknown, any, any, Record<string, any>>, {}> & ApiKey & Document<unknown, any, any, Record<string, any>> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
