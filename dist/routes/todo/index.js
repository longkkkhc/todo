"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../../controller/todo.controller");
const asyncHandler_1 = require("../../helper/asyncHandler");
const authUtils_1 = require("../../authUtils/authUtils");
const router = (0, express_1.Router)();
const todoController = new todo_controller_1.TodoController();
router.use(authUtils_1.authorization);
router.get('/:userId', (0, asyncHandler_1.asyncHandler)(todoController.findAllTodos));
router.get('/detail/:todoId', (0, asyncHandler_1.asyncHandler)(todoController.findTodoById));
router.post('/', (0, asyncHandler_1.asyncHandler)(todoController.createTodo));
router.put('/:todoId', (0, asyncHandler_1.asyncHandler)(todoController.updateTodo));
router.delete('/:todoId', (0, asyncHandler_1.asyncHandler)(todoController.deleteTodo));
exports.default = router;
//# sourceMappingURL=index.js.map