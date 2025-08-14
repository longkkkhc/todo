"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controller/user.controller");
const asyncHandler_1 = require("../../helper/asyncHandler");
const authUtils_1 = require("../../authUtils/authUtils");
const router = (0, express_1.Router)();
// POST /signup
router.post('/signup', (0, asyncHandler_1.asyncHandler)(user_controller_1.UserController.signup));
// POST /login
router.post('/login', (0, asyncHandler_1.asyncHandler)(user_controller_1.UserController.login));
// POST /logout
router.use(authUtils_1.authorization);
router.post('/logout', (0, asyncHandler_1.asyncHandler)(user_controller_1.UserController.logout));
exports.default = router;
//# sourceMappingURL=index.js.map