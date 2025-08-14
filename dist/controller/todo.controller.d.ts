import { Request, Response, NextFunction } from 'express';
export declare class TodoController {
    private todoService;
    findAllTodos: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findTodoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
