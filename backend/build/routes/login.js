"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controller/loginController");
const loginRouter = (0, express_1.default)();
loginRouter.post('/', loginController_1.handleLogin);
exports.default = loginRouter;
