"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    // Đăng ký
    static async signup(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await user_service_1.UserService.signup(email, password);
            res.status(201).json({
                message: 'User registered successfully',
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Đăng nhập
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await user_service_1.UserService.login(email, password);
            res.status(200).json({
                message: 'Login successful',
                data: result
            });
        }
        catch (error) {
            next(error);
        }
    }
    // Đăng xuất
    static async logout(req, res, next) {
        try {
            const { userId } = req.body; // hoặc req.user nếu bạn có middleware auth
            const result = await user_service_1.UserService.logout(userId);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map