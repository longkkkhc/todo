import { Router } from 'express';
import { TodoController } from '../../controller/todo.controller';
import { asyncHandler } from '@/helper/asyncHandler';
import { authorization } from '@/authUtils/authUtils';

const router = Router();
const todoController = new TodoController();
router.use(authorization)
router.get('/:userId', asyncHandler(todoController.findAllTodos));
router.get('/detail/:todoId', asyncHandler(todoController.findTodoById));
router.post('/', asyncHandler(todoController.createTodo));
router.put('/:todoId', asyncHandler(todoController.updateTodo));
router.delete('/:todoId', asyncHandler(todoController.deleteTodo));

export default router;
