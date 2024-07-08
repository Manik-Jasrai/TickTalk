"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const MessageSchema = new mongoose_1.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    readStatus: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    chat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true
});
// Create and export the Mongoose model
exports.default = (0, mongoose_1.model)('Message', MessageSchema);
