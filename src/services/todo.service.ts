import { HttpException } from '@/core/httpException';
import {Todo} from '@interfaces/todo.interfaces';
import { TodoModel } from '@models/todolist.models';
import {Types} from 'mongoose';
export class TodoService {
    public async findAllTodos(userId:string): Promise<Todo[]> {
        const todos: Todo[] = await TodoModel.find({userId});
        return todos;
    }
    public async findTodoById(todoId: string): Promise<Todo> {
        const findTodo: Todo = await TodoModel.findOne({ _id: todoId });
        if (!findTodo) throw new Error("Todo doesn't exist");

        return findTodo;
    }
    public async createTodo(userId : string,title : string,completed : boolean): Promise<Todo> {
        const createTodoData: Todo = await TodoModel.create({
            userId: new Types.ObjectId(userId),
            title: title,
            completed: completed
        });
        return createTodoData;
    }
    public async updateTodo(todoId : string,userId: string,title : string,completed : boolean): Promise<Todo> {
        const updateTodoById: Todo = await TodoModel.findOneAndUpdate({
            _id: todoId,
            userId: new Types.ObjectId(userId)
        }, {
            title: title,
            completed: completed
        }, {
            new: true
        })
        if (!updateTodoById) {
            throw new HttpException(409, "Todo doesn't exist or you don't have permission to update this todo");
        }
        return updateTodoById;
    }
    public async deleteTodo(todoId: string, userId: string): Promise<Todo> {
        const deleteTodoById: Todo = await TodoModel.findOneAndDelete({
            _id: todoId,
            userId: new Types.ObjectId(userId)
        });
        if (!deleteTodoById) throw new HttpException(409, "Todo doesn't exist or you don't have permission to delete this todo");

        return deleteTodoById;
    }
}