import { Schema, model, Document, Types } from "mongoose";

// Define the TypeScript interface
interface IChat extends Document {
    members: Types.ObjectId[];
    messages: Types.ObjectId[];
    lastMessage: Types.ObjectId | null;
}

// Define the Mongoose schema
const ChatSchema: Schema<IChat> = new Schema(
    {
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: true
        }],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            default: null
        }
    }
);

// Create and export the Mongoose model
export default model<IChat>('Chat', ChatSchema);
