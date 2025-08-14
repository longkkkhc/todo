"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.apikeyCheck = void 0;
const tslib_1 = require("tslib");
const apikey_service_1 = tslib_1.__importDefault(require("../services/apikey.service"));
const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization",
};
const apikeyCheck = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY];
        console.log('x-api-key header:', key);
        if (!key) {
            return res.status(403).json({ message: 'Forbidden Error' });
        }
        // check objKey
        const keyString = key.toString();
        const objKey = await (0, apikey_service_1.default)(keyString);
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            });
        }
        req.objKey = objKey;
        return next();
    }
    catch (error) {
    }
};
exports.apikeyCheck = apikeyCheck;
const permissions = (permissions) => {
    console.log("==============================================");
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'promissions denied'
            });
        }
        console.log('permissions :', req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permissions);
        if (!validPermission) {
            return res.status(403).json({
                message: 'promissions denied'
            });
        }
        return next();
    };
};
exports.permissions = permissions;
//# sourceMappingURL=checkUtils.js.map