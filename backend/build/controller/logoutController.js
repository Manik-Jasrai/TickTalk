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
exports.handleLogout = void 0;
const User_1 = __importDefault(require("../model/User"));
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    if (!cookie || !cookie.jwt)
        return res.sendStatus(204); //no content
    const refreshToken = cookie.jwt;
    const validUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!validUser) {
        //clear the cookie
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204);
        return;
    }
    validUser.refreshToken = '';
    yield validUser.save();
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
});
exports.handleLogout = handleLogout;
