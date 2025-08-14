"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_mongodb_1 = tslib_1.__importDefault(require("../config/config.mongodb"));
const { db: { host, port, name } } = config_mongodb_1.default;
const connect = `mongodb://${host}:${port}/${name}`;
console.log(connect);
class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        if (type === 'mongodb') {
            mongoose_1.default.set('debug', true);
            // mongoose.set('debug', { color: true })
            // }
            mongoose_1.default.connect(connect, {
                maxPoolSize: 50
            })
                .then(() => console.log('✅ MongoDB connected!!!'))
                .catch(err => console.error('❌ MongoDB connection error:', err));
        }
    }
    static getIntance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const intanceMongo = Database.getIntance();
exports.default = intanceMongo;
//# sourceMappingURL=init.mongodb.js.map