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
exports.getAllChats = void 0;
const User_1 = __importDefault(require("../model/User"));
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all chats of logged in user
    const user = req.user;
    if (!user)
        return res.sendStatus(401);
    const validUser = yield User_1.default.findOne({ username: user.username })
        .populate({
        path: "chats",
        populate: [
            { path: "members" },
            { path: "messages" },
            { path: "lastMessage" }
        ]
    })
        .exec();
    if (!validUser)
        return res.status(401).json({ 'message': 'User not found' });
    const chats = validUser.chats;
    res.json({ 'chats': chats });
});
exports.getAllChats = getAllChats;
