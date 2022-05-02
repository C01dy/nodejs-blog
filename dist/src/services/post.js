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
exports.getOne = exports.getMany = void 0;
const db_1 = require("../db");
const getMany = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            name: 'get-many-posts',
            text: `
          SELECT
              post.title, post.content, post.id, post.created_at,
              post.updated_at, "user".first_name, "user".last_name, "user".username
          FROM post JOIN "user" ON post.author_id = "user".id;
      `,
        };
        const posts = yield db_1.pool.query(query);
        return posts.rows;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getMany = getMany;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {
            name: 'get-post',
            text: `
          SELECT
              post.title, post.content, post.id, post.created_at,
              post.updated_at, "user".first_name, "user".last_name, "user".username
          FROM post JOIN "user" ON post.author_id = "user".id WHERE post.id = $1;
      `,
        };
        const post = yield db_1.pool.query(query, [id]);
        return post.rows[0];
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=post.js.map