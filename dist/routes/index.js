"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const checkUtils_1 = require("../authUtils/checkUtils");
const user_1 = tslib_1.__importDefault(require("./user")); // <-- Thay đổi này
const todo_1 = tslib_1.__importDefault(require("./todo")); // <-- Thay đổi này
const router = (0, express_1.Router)();
router.use(checkUtils_1.apikeyCheck);
router.use((0, checkUtils_1.permissions)('0000'));
router.use('/v1/api/user', user_1.default); // <-- Thay đổi này
router.use('/v1/api/todo', todo_1.default); // <-- Thay đổi này
exports.default = router;
//# sourceMappingURL=index.js.map