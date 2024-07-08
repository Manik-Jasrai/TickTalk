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
exports.checkUser = exports.updateProfile = void 0;
const User_1 = __importDefault(require("../model/User"));
const Chat_1 = __importDefault(require("../model/Chat"));
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newProfile = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.profile;
    if (!newProfile)
        return res.status(400).json({ 'message': 'Invalid Body' });
    const user = req.user;
    if (!user)
        return res.sendStatus(401);
    const validUser = yield User_1.default.findOne({ username: user.username }).exec();
    if (!validUser)
        return res.status(401).json({ 'message': 'User not found' });
    validUser.profile = newProfile;
    yield validUser.save();
    return res.sendStatus(200);
});
exports.updateProfile = updateProfile;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { username } = req === null || req === void 0 ? void 0 : req.params;
    try {
        if (!username)
            return res.status(400).json({ 'message': 'Invalid Body' });
        const user = yield User_1.default.findOne({ username: username }).exec();
        if (user) {
            const my = (_b = req.user) === null || _b === void 0 ? void 0 : _b.username;
            const them = user.username;
            console.log(my, them);
            const sender = yield User_1.default.findOne({ username: my });
            const receiver = yield User_1.default.findOne({ username: them });
            const existingChat = yield Chat_1.default.findOne({
                members: {
                    $all: [sender === null || sender === void 0 ? void 0 : sender._id, receiver === null || receiver === void 0 ? void 0 : receiver._id]
                }
            }).exec();
            if (existingChat) {
                return res.status(200).json({ result: false, message: 'Chat Already exists' });
            }
            return res.status(200).json({ result: true, message: 'User found' });
        }
        return res.status(200).json({ result: false, message: 'User not Found' });
    }
    catch (e) {
        return res.status(500).json({ result: false, message: 'User not Found' });
    }
});
exports.checkUser = checkUser;
