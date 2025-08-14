"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apikeyModel = void 0;
const mongoose_1 = require("mongoose");
const ApiKeySchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222']
    }
});
exports.apikeyModel = (0, mongoose_1.model)('ApiKey', ApiKeySchema);
//# sourceMappingURL=apikey.models.js.map