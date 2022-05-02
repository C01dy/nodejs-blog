"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_jwt_1 = require("express-jwt");
const post_1 = require("../controllers/post");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const router = (0, express_1.Router)();
router.use((0, express_jwt_1.expressjwt)({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"]
}));
router.get("/", post_1.getManyPosts);
router.get("/:id", post_1.getOnePost);
exports.default = router;
//# sourceMappingURL=post.js.map