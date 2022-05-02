"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRefreshToken = exports.getRefreshToken = void 0;
const db_1 = require("../db");
const helpers_1 = require("../db/helpers");
const getRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            name: 'get-refresh-token',
            text: `
                  SELECT * FROM 
                    "refresh_tokens" WHERE "refresh_tokens".token = $1;
            `,
        };
        const tokenData = yield db_1.pool.query(query, [token]);
        return tokenData.rows[0];
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getRefreshToken = getRefreshToken;
const saveRefreshToken = ({ token, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [dataKeysString, dataValuesArray] = (0, helpers_1.transformInsertionDataForQueryString)({
            userId,
            token,
        });
        const query = {
            name: 'save-refresh-token',
            text: `
                INSERT INTO "refresh_tokens" (${dataKeysString})
                VALUES
                    (${dataValuesArray
                .map((_, idx) => `$${idx + 1}`)
                .join(', ')}) RETURNING *;
            `
        };
        const tokenData = yield db_1.pool.query(query, dataValuesArray);
        console.table(tokenData.rows);
        return tokenData.rows[0];
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.saveRefreshToken = saveRefreshToken;
//# sourceMappingURL=auth.js.map