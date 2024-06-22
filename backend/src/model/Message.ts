import { Schema, model, Document, Types } from "mongoose";

// Define the TypeScript interface
interface IMessage extends Document {
    _id : Schema.Types.ObjectId;
    sender: String;
    receiver: String;
    content?: string;
    readStatus: boolean;
    timeStamp: Date;
}

// Define the Mongoose schema
const MessageSchema: Schema<IMessage> = new Schema(
    {
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
        }
    },
    {
        timestamps: true
    }
);

// Create and export the Mongoose model
export default model<IMessage>('Message', MessageSchema);
