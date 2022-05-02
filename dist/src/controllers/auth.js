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
exports.auth = exports.refreshToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../services/user");
const uuid_1 = require("uuid");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../services/auth");
(0, dotenv_1.config)();
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const dbToken = yield (0, auth_1.getRefreshToken)(refreshToken);
        if (!dbToken) {
            return;
        }
        const newRefreshToken = (0, uuid_1.v4)();
        yield (0, auth_1.saveRefreshToken)({
            token: refreshToken,
            userId: dbToken.user_id
        });
        res.status(200).json({
            token: jsonwebtoken_1.default.sign({
                exp: 60000,
                data: dbToken.user_id
            }, process.env.SECRET_KEY || 'verysecretkey'),
            refreshToken: newRefreshToken
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.refreshToken = refreshToken;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, user_1.getOne)(email);
        if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
            res.status(403).json({
                message: 'Incorrect email or password'
            });
            throw new Error();
        }
        const refreshToken = (0, uuid_1.v4)();
        yield (0, auth_1.saveRefreshToken)({
            token: refreshToken,
            userId: user.id
        });
        res.status(200).json({
            token: jsonwebtoken_1.default.sign({
                exp: 60000,
                data: user.id
            }, process.env.SECRET_KEY || 'verysecretkey'),
            refreshToken
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map