"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apikey_models_1 = require("../models/apikey.models");
const crypto_1 = require("crypto");
const findbyId = async (key) => {
    if (!key) {
        // Tạo key mới
        const newKeyValue = (0, crypto_1.randomBytes)(64).toString('hex');
        const newKeyDoc = await apikey_models_1.apikeyModel.create({
            key: newKeyValue,
            permissions: ['0000'],
            status: true
        });
        console.log("API Key mới:", newKeyValue);
        return newKeyDoc;
    }
    // Tìm key đã có
    const objKey = await apikey_models_1.apikeyModel.findOne({ key, status: true }).lean();
    return objKey;
};
exports.default = findbyId;
//# sourceMappingURL=apikey.service.js.map