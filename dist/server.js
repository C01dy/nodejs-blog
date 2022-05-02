"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(routes_1.default);
app.listen(process.env.SERVER_PORT || 3000, (err) => {
    if (err) {
        throw new Error(err);
    }
    else {
        console.log(`Server is running on ${process.env.PORT || 3000}`);
    }
});
//# sourceMappingURL=server.js.map