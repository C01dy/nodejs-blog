"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dbConfig = {
    user: process.env.PGUSER,
    host: process.env.PBHOST,
    database: process.env.PGDATABASE,
    password: process.env.PBPASSWORD,
    port: process.env.PGPORT,
};
exports.pool = new pg_1.Pool(dbConfig);
//# sourceMappingURL=index.js.map