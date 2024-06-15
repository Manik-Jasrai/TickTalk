import { Schema, model, Document } from "mongoose";

// Define the TypeScript interface
interface IMessage extends Document {
    sender: Schema.Types.ObjectId;
    content?: string;
    readStatus: boolean;
    timeStamp: Date;
}

// Define the Mongoose schema
const MessageSchema: Schema<IMessage> = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
        }
    },
    {
        timestamps: true
    }
);

// Create and export the Mongoose model
export default model<IMessage>('Message', MessageSchema);
