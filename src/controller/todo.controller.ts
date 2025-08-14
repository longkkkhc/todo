import { Request, Response, NextFunction } from 'express';
import { TodoService } from '@services/todo.service';
import { HttpException } from '@core/httpException';

export class TodoController {
  private todoService = new TodoService();

  // Lấy tất cả Todo của 1 user
  public findAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params; // hoặc req.user.userId nếu có middleware auth
      const todos = await this.todoService.findAllTodos(userId);
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  };

  // Lấy 1 Todo theo ID
  public findTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;
      const todo = await this.todoService.findTodoById(todoId);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  // Tạo Todo mới
  public createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, title, completed } = req.body;
      const newTodo = await this.todoService.createTodo(userId, title, completed);
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật Todo
  public updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;
      const { userId, title, completed } = req.body;
      const updatedTodo = await this.todoService.updateTodo(todoId, userId, title, completed);
      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  };

  // Xóa Todo
  public deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { todoId } = req.params;
      const { userId } = req.body;
      const deletedTodo = await this.todoService.deleteTodo(todoId, userId);
      res.status(200).json(deletedTodo);
    } catch (error) {
      next(error);
    }
  };
}
