"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.createKeypair = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const asyncHandler_1 = require("../helper/asyncHandler");
const httpException_1 = require("../core/httpException");
const keyToken_service_1 = tslib_1.__importDefault(require("../services/keyToken.service"));
const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
};
const createKeypair = async (payload, publickey, privateKey) => {
    try {
        const accessToken = await (0, jsonwebtoken_1.sign)(payload, publickey, {
            expiresIn: "2days"
        });
        const refreshToken = await (0, jsonwebtoken_1.sign)(payload, privateKey, {
            expiresIn: "7days"
        });
        const decode = await (0, jsonwebtoken_1.verify)(accessToken, publickey);
        console.log(decode);
        return { accessToken, refreshToken };
    }
    catch (error) {
    }
};
exports.createKeypair = createKeypair;
const authorization = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) {
        throw new httpException_1.HttpException(403, 'Forbidden Error');
    }
    const todo = await keyToken_service_1.default.findByUserId(userId);
    if (!todo) {
        throw new httpException_1.HttpException(403, 'Forbidden Error');
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) {
        throw new httpException_1.HttpException(403, 'Forbidden Error');
    }
    try {
        const decodeUser = (0, jsonwebtoken_1.verify)(accessToken, todo.publicKey);
        if (userId !== decodeUser.userId) {
            throw new httpException_1.HttpException(403, 'Forbidden Error');
        }
        req.todo = todo;
        req.user = decodeUser;
        return next();
    }
    catch (err) {
        console.error("JWT verification error:", err);
        throw new httpException_1.HttpException(403, 'Forbidden Error');
    }
});
exports.authorization = authorization;
//# sourceMappingURL=authUtils.js.map