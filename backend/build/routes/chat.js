"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const chatRouter = (0, express_1.default)();
chatRouter.get('/', chatController_1.getAllChats);
exports.default = chatRouter;
