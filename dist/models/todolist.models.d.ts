import { Document } from 'mongoose';
import { Todo } from '../interfaces/todo.interfaces';
export declare const TodoModel: import("mongoose").Model<Todo & Document<unknown, any, any, Record<string, any>>, {}, {}, {}, Document<unknown, {}, Todo & Document<unknown, any, any, Record<string, any>>, {}> & Todo & Document<unknown, any, any, Record<string, any>> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
