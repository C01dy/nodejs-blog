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
exports.getOnePost = exports.getManyPosts = void 0;
const post_1 = require("../services/post");
const getManyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postList = yield (0, post_1.getMany)();
        res.status(200).json({
            status: 1,
            data: postList
        });
        return postList;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getManyPosts = getManyPosts;
const getOnePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, post_1.getOne)(id);
        return post;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getOnePost = getOnePost;
//# sourceMappingURL=post.js.map