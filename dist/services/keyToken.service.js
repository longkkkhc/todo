"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const keyToken_models_1 = require("../models/keyToken.models");
const mongoose_1 = require("mongoose");
class keyTokenService {
}
_a = keyTokenService;
keyTokenService.createKeytoken = async ({ userId, privateKey, publicKey, refreshToken }) => {
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userID format');
            ``;
        }
        const filter = { user: new mongoose_1.Types.ObjectId(userId) }, update = {
            publicKey, privateKey, refreshTokensUsed: [], refreshToken
        }, options = { upsert: true, new: true }; // upsert: true là quan trọng
        const tokens = await keyToken_models_1.keyTokenModel.findOneAndUpdate(filter, update, options);
        return tokens ? tokens.publicKey : null;
    }
    catch (error) {
        console.error("Error in createKeytoken:", error); // Thêm log lỗi ở đây
        return null;
    }
};
keyTokenService.findByUserId = async (userId) => {
    return await keyToken_models_1.keyTokenModel.findOne({ user: (userId) });
};
exports.default = keyTokenService;
//# sourceMappingURL=keyToken.service.js.map