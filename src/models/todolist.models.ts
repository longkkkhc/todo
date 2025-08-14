'use strict'
import { model, Schema, Document } from 'mongoose';
import { Todo } from '@/interfaces/todo.interfaces';
 
const TodoSchema  : Schema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default : false
  },
});
export const TodoModel = model<Todo & Document>('Todo', TodoSchema);
