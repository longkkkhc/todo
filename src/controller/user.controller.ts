import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { HttpException } from '@core/httpException';

export class UserController {
  // Đăng ký
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await UserService.signup(email, password);
      res.status(201).json({
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Đăng nhập
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.status(200).json({
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Đăng xuất
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body; // hoặc req.user nếu bạn có middleware auth
      const result = await UserService.logout(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

