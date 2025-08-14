"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = tslib_1.__importDefault(require("./app"));
const PORT = process.env.PORT || 3056;
const server = app_1.default.listen(PORT, () => {
    console.log(`WSW eCommerce start with ${PORT}`);
});
// process.on('SIGINT',() => {
//     server.close(() => console.log (`Exit`))
//     // notify.send()
//     // // dùng để thông báo sever đóng 
// })
console.log("ENV", process.env.PORT);
//# sourceMappingURL=server.js.map