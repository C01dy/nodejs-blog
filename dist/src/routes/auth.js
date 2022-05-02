"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const auth_1 = require("../controllers/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/refresh", auth_1.refreshToken);
router.post("/sign_up", user_1.createUser);
router.post("/login", auth_1.auth);
exports.default = router;
//# sourceMappingURL=auth.js.map