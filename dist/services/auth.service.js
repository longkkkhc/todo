"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeKeyById = exports.findByEmail = void 0;
const user_models_1 = require("../models/user.models");
const findByEmail = async (email, select = {
    email: 1, password: 2, name: 1, status: 1, roles: 1
}) => {
    return await user_models_1.UserModel.findOne({ email }).select(select).lean();
};
exports.findByEmail = findByEmail;
const removeKeyById = async (id) => {
    return await user_models_1.UserModel.findByIdAndDelete(id);
};
exports.removeKeyById = removeKeyById;
//# sourceMappingURL=auth.service.js.map