import { Router } from 'express';
import { UserController } from '../../controller/user.controller';
import { asyncHandler } from '@/helper/asyncHandler';
import { authorization } from '@/authUtils/authUtils';
const router = Router();

// POST /signup
router.post('/signup', asyncHandler(UserController.signup));

// POST /login
router.post('/login', asyncHandler(UserController.login));

// POST /logout
router.use(authorization);
router.post('/logout', asyncHandler(UserController.logout));

export default router;