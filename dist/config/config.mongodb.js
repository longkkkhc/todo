"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    app: {
        PORT: process.env.PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'todo'
    }
};
exports.default = config;
//# sourceMappingURL=config.mongodb.js.map