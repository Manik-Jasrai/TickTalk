import { Schema, model, Document, Types } from "mongoose";

// Define the TypeScript interface
interface IChat extends Document {
    _id : Schema.Types.ObjectId;
    members: String[];
    messages: Schema.Types.ObjectId[];
    lastMessage: Schema.Types.ObjectId | null;
}

// Define the Mongoose schema
const ChatSchema: Schema<IChat> = new Schema(
    {
        members: [String],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
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
