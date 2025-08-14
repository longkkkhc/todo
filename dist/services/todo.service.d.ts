import { Todo } from '../interfaces/todo.interfaces';
export declare class TodoService {
    findAllTodos(userId: string): Promise<Todo[]>;
    findTodoById(todoId: string): Promise<Todo>;
    createTodo(userId: string, title: string, completed: boolean): Promise<Todo>;
    updateTodo(todoId: string, userId: string, title: string, completed: boolean): Promise<Todo>;
    deleteTodo(todoId: string, userId: string): Promise<Todo>;
}
