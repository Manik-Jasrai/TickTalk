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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ws_1 = require("ws");
const onlineClients_1 = __importDefault(require("../data/onlineClients"));
const updateChat_1 = require("./updateChat");
const WebSocketFunction = (expressServer) => {
    const wss = new ws_1.WebSocketServer({ server: expressServer });
    wss.on('connection', (ws, req) => {
        var _a;
        ws.on('error', console.error);
        // Authentication
        const token = new URLSearchParams((_a = (req === null || req === void 0 ? void 0 : req.url)) === null || _a === void 0 ? void 0 : _a.split('?')[1]).get('token');
        if (!token)
            return ws.close(401);
        let username = '';
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err)
                return ws.close(401);
            const decodedPayload = decoded;
            username = decodedPayload.User.username;
        });
        // Add the user to online clients
        onlineClients_1.default[username] = ws;
        // On Message
        ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
            // verify the message
            const msgObject = JSON.parse(message.toString());
            // send to database            
            const newMessage = {
                sender: msgObject.sender,
                receiver: msgObject.receiver,
                content: msgObject.content
            };
            // Register to DB
            const messageCreated = yield (0, updateChat_1.updateChat)(newMessage);
            console.log('updated db');
            //send back to sender if online
            const sender = onlineClients_1.default[newMessage.sender];
            if (sender && sender.readyState == ws_1.WebSocket.OPEN) {
                sender.send(JSON.stringify(messageCreated));
            }
            // send to reciever if online
            const onlineReceiver = onlineClients_1.default[newMessage.receiver];
            if (onlineReceiver && onlineReceiver.readyState == ws_1.WebSocket.OPEN) {
                // send to receiver
                onlineReceiver.send(JSON.stringify(messageCreated));
            }
        }));
        ws.on('close', () => {
            delete onlineClients_1.default[username];
        });
    });
};
exports.default = WebSocketFunction;
