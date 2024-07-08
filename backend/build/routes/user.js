"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRouter = (0, express_1.default)();
userRouter.post('/profile', userController_1.updateProfile);
userRouter.get('/check/:username', userController_1.checkUser);
exports.default = userRouter;
