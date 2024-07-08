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
exports.handleLogin = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!(username && password))
        return res.status(400).json({ 'message': `User and password required` });
    const validUser = yield User_1.default.findOne({ username: username }).exec();
    if (!validUser)
        return res.sendStatus(401);
    const validPass = yield bcrypt_1.default.compare(password, validUser.password);
    if (validPass) {
        const accessToken = jsonwebtoken_1.default.sign({
            "User": {
                "username": validUser.username
            }
        }, //payload
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = jsonwebtoken_1.default.sign({
            "User": {
                "username": validUser.username
            }
        }, //payload
        process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        yield User_1.default.updateOne(validUser, { refreshToken });
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, validUser });
    }
    else {
        res.sendStatus(401);
    }
});
exports.handleLogin = handleLogin;
