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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = require("../services/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExist = !!(yield (0, user_1.getOne)(req.body.email)) || false;
        if (isUserExist) {
            res.status(403).json({
                status: 0,
                message: `user with ${req.body.email} email address already exists`,
            });
            return;
        }
        const encryptedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword,
            username: req.body.username,
        };
        const user = yield (0, user_1.createOne)(userData);
        res.status(200).json({
            status: 1,
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 0,
            message: "Error when try to create user",
        });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.js.map