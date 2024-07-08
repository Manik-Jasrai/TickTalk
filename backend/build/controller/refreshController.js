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
exports.handleRefresh = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleRefresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.jwt))
        return res.sendStatus(401); //Unauthorised
    //cookie.jwt exists then
    const refreshToken = cookie.jwt;
    const validUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!validUser)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || decoded.User.username !== validUser.username)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign({
            "User": {
                "username": validUser.username
            }
        }, //payload
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        res.json({ accessToken });
    });
});
exports.handleRefresh = handleRefresh;
