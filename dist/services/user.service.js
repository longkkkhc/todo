"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const typedi_1 = require("typedi");
const authUtils_1 = require("../authUtils/authUtils");
const crypto_1 = require("crypto");
const httpException_1 = require("../core/httpException");
const user_models_1 = require("../models/user.models");
const auth_service_1 = require("../services/auth.service");
const keyToken_service_1 = tslib_1.__importDefault(require("../services/keyToken.service"));
let UserService = class UserService {
    static async signup(email, password) {
        const existingUser = await user_models_1.UserModel.findOne({ email }).lean();
        if (existingUser) {
            throw new httpException_1.HttpException(409, 'User already exists');
        }
        if (!password) {
            throw new httpException_1.HttpException(400, 'Password is required');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const publicKey = (0, crypto_1.randomBytes)(64).toString('hex');
        const privateKey = (0, crypto_1.randomBytes)(64).toString('hex');
        console.log(publicKey, privateKey);
        const userTodo = await user_models_1.UserModel.create({
            email,
            password: hashedPassword,
            publicKey,
            privateKey
        });
        const tokens = await (0, authUtils_1.createKeypair)(userTodo._id, publicKey, privateKey);
        return {
            user: userTodo.toObject(),
            tokens
        };
    }
};
exports.UserService = UserService;
UserService.login = async (email, password) => {
    const foundTodo = await (0, auth_service_1.findByEmail)(email);
    if (!foundTodo) {
        throw new httpException_1.HttpException(404, "User not found");
    }
    const match = await (0, bcrypt_2.compare)(password, foundTodo.password);
    if (!match) {
        throw new httpException_1.HttpException(401, "Invalid password");
    }
    const publicKey = (0, crypto_1.randomBytes)(64).toString('hex');
    const privateKey = (0, crypto_1.randomBytes)(64).toString('hex');
    const userId = foundTodo._id;
    const tokens = await (0, authUtils_1.createKeypair)(userId, publicKey, privateKey);
    await keyToken_service_1.default.createKeytoken({
        userId: userId.toString(),
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken
    });
    return {
        user: foundTodo,
        tokens
    };
};
UserService.logout = async (userId) => {
    if (!userId) {
        throw new httpException_1.HttpException(400, 'User ID is required');
    }
    const removed = await (0, auth_service_1.removeKeyById)(userId); // Hàm này sẽ xóa publicKey/privateKey khỏi DB
    if (!removed) {
        throw new httpException_1.HttpException(404, 'User not found or already logged out');
    }
    return { message: 'logout successfully' };
};
exports.UserService = UserService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserService);
//# sourceMappingURL=user.service.js.map