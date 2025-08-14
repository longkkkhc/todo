import { apikeyModel } from "../models/apikey.models";
import { randomBytes } from "crypto";

const findbyId = async (key?: string) => {
    if (!key) {
        // Tạo key mới
        const newKeyValue = randomBytes(64).toString('hex');
        const newKeyDoc = await apikeyModel.create({
            key: newKeyValue,
            permissions: ['0000'],
            status: true
        });
        console.log("API Key mới:", newKeyValue);
        return newKeyDoc;
    }

    // Tìm key đã có
    const objKey = await apikeyModel.findOne({ key, status: true }).lean();
    return objKey;
};

export default findbyId;
