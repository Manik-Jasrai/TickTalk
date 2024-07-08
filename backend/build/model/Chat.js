"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const ChatSchema = new mongoose_1.Schema({
    members: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }],
    messages: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message'
        }],
    lastMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    }
});
// Create and export the Mongoose model
exports.default = (0, mongoose_1.model)('Chat', ChatSchema);
