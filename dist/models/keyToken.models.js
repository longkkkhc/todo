"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyTokenModel = void 0;
const mongoose_1 = require("mongoose");
const keyTokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    privateKey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    refreshTokenUsed: {
        type: Array,
        default: []
    }
});
exports.keyTokenModel = (0, mongoose_1.model)('KeyToken', keyTokenSchema);
//# sourceMappingURL=keyToken.models.js.map