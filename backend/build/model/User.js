"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    refreshToken: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
    profile: {
        type: String,
        default: 'default.jpg'
    },
    chats: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Chat'
        }]
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
