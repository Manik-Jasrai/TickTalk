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
exports.updateChat = void 0;
const Chat_1 = __importDefault(require("../model/Chat"));
const Message_1 = __importDefault(require("../model/Message"));
const User_1 = __importDefault(require("../model/User"));
const createChat = (msgObject) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield User_1.default.findOne({ username: msgObject.sender });
    const receiver = yield User_1.default.findOne({ username: msgObject.receiver });
    const newChat = yield Chat_1.default.create({
        members: [sender === null || sender === void 0 ? void 0 : sender._id, receiver === null || receiver === void 0 ? void 0 : receiver._id],
        messages: []
    });
    sender === null || sender === void 0 ? void 0 : sender.chats.push(newChat._id);
    receiver === null || receiver === void 0 ? void 0 : receiver.chats.push(newChat._id);
    yield (sender === null || sender === void 0 ? void 0 : sender.save());
    yield (receiver === null || receiver === void 0 ? void 0 : receiver.save());
    return newChat;
});
const updateChat = (msgObject) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield User_1.default.findOne({ username: msgObject.sender });
    const receiver = yield User_1.default.findOne({ username: msgObject.receiver });
    const existingChat = yield Chat_1.default.findOne({
        members: {
            $all: [sender === null || sender === void 0 ? void 0 : sender._id, receiver === null || receiver === void 0 ? void 0 : receiver._id]
        }
    }).exec();
    let chat;
    if (!existingChat) {
        // Create new chat and add the chat to users
        chat = yield createChat(msgObject);
    }
    else {
        chat = existingChat;
    }
    //create new message
    const message = yield Message_1.default.create({
        sender: msgObject.sender,
        receiver: msgObject.receiver,
        content: msgObject.content
    });
    // put the message in the chat
    if (chat) {
        chat.messages.push(message._id);
        chat.lastMessage = message._id;
        yield chat.save();
    }
    chat = yield Chat_1.default.findOne({
        members: {
            $all: [sender === null || sender === void 0 ? void 0 : sender._id, receiver === null || receiver === void 0 ? void 0 : receiver._id]
        }
    }).populate({ path: "members messages lastMessage" }).exec();
    return { message, chat };
});
exports.updateChat = updateChat;
