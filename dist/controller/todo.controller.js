"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("../services/todo.service");
class TodoController {
    constructor() {
        this.todoService = new todo_service_1.TodoService();
        // Lấy tất cả Todo của 1 user
        this.findAllTodos = async (req, res, next) => {
            try {
                const { userId } = req.params; // hoặc req.user.userId nếu có middleware auth
                const todos = await this.todoService.findAllTodos(userId);
                res.status(200).json(todos);
            }
            catch (error) {
                next(error);
            }
        };
        // Lấy 1 Todo theo ID
        this.findTodoById = async (req, res, next) => {
            try {
                const { todoId } = req.params;
                const todo = await this.todoService.findTodoById(todoId);
                res.status(200).json(todo);
            }
            catch (error) {
                next(error);
            }
        };
        // Tạo Todo mới
        this.createTodo = async (req, res, next) => {
            try {
                const { userId, title, completed } = req.body;
                const newTodo = await this.todoService.createTodo(userId, title, completed);
                res.status(201).json(newTodo);
            }
            catch (error) {
                next(error);
            }
        };
        // Cập nhật Todo
        this.updateTodo = async (req, res, next) => {
            try {
                const { todoId } = req.params;
                const { userId, title, completed } = req.body;
                const updatedTodo = await this.todoService.updateTodo(todoId, userId, title, completed);
                res.status(200).json(updatedTodo);
            }
            catch (error) {
                next(error);
            }
        };
        // Xóa Todo
        this.deleteTodo = async (req, res, next) => {
            try {
                const { todoId } = req.params;
                const { userId } = req.body;
                const deletedTodo = await this.todoService.deleteTodo(todoId, userId);
                res.status(200).json(deletedTodo);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map