import { Schema,model } from "mongoose";

const ChatSchema : Schema = new Schema(
    {
        members : [{
            type : Schema.Types.ObjectId,
            ref : 'User'
        }],
        messages : [{
            type : Schema.Types.ObjectId,
            ref : 'Message',
        }],
        lastMessage : {
            type : Schema.Types.ObjectId,
            ref : 'Message',
            default : null
        }

    }
);

export default model('Chat',ChatSchema)