"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController_1 = require("../controller/registerController");
const registerRouter = (0, express_1.default)();
registerRouter.post('/', registerController_1.handleNewUser);
exports.default = registerRouter;
