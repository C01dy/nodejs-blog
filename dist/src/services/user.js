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
exports.createOne = exports.getOne = void 0;
const db_1 = require("../db");
const helpers_1 = require("../db/helpers");
const getOne = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            name: 'get-user',
            text: `
            SELECT
              "user".id, "user".first_name, "user".last_name, "user".username, "user".email, "user".password
            FROM 
              "user" WHERE "user".email = $1;
      `,
        };
        const user = yield db_1.pool.query(query, [email]);
        console.table(user.rows);
        return user.rows[0];
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getOne = getOne;
const createOne = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [dataKeysString, dataValuesArray] = (0, helpers_1.transformInsertionDataForQueryString)(userData);
        const query = {
            name: 'create-user',
            text: `
            INSERT INTO "user" (${dataKeysString})
            VALUES(${dataValuesArray
                .map((_, idx) => `$${idx + 1}`)
                .join(', ')}) RETURNING *;
      `,
        };
        const user = yield db_1.pool.query(query, dataValuesArray);
        return user.rows[0];
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createOne = createOne;
//# sourceMappingURL=user.js.map