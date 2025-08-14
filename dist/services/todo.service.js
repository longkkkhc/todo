"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const httpException_1 = require("../core/httpException");
const todolist_models_1 = require("../models/todolist.models");
const mongoose_1 = require("mongoose");
class TodoService {
    async findAllTodos(userId) {
        const todos = await todolist_models_1.TodoModel.find({ userId });
        return todos;
    }
    async findTodoById(todoId) {
        const findTodo = await todolist_models_1.TodoModel.findOne({ _id: todoId });
        if (!findTodo)
            throw new Error("Todo doesn't exist");
        return findTodo;
    }
    async createTodo(userId, title, completed) {
        const createTodoData = await todolist_models_1.TodoModel.create({
            userId: new mongoose_1.Types.ObjectId(userId),
            title: title,
            completed: completed
        });
        return createTodoData;
    }
    async updateTodo(todoId, userId, title, completed) {
        const updateTodoById = await todolist_models_1.TodoModel.findOneAndUpdate({
            _id: todoId,
            userId: new mongoose_1.Types.ObjectId(userId)
        }, {
            title: title,
            completed: completed
        }, {
            new: true
        });
        if (!updateTodoById) {
            throw new httpException_1.HttpException(409, "Todo doesn't exist or you don't have permission to update this todo");
        }
        return updateTodoById;
    }
    async deleteTodo(todoId, userId) {
        const deleteTodoById = await todolist_models_1.TodoModel.findOneAndDelete({
            _id: todoId,
            userId: new mongoose_1.Types.ObjectId(userId)
        });
        if (!deleteTodoById)
            throw new httpException_1.HttpException(409, "Todo doesn't exist or you don't have permission to delete this todo");
        return deleteTodoById;
    }
}
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map