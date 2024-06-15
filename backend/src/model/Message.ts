import { timeStamp } from "console";
import { Schema, model } from "mongoose";

const MessageSchema : Schema = new Schema(
    {
        sender : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        content : {
            type : String
        },
        readStatus : {
            type : Boolean,
            default : false
        },
        timeStamp : {
            type : Date,
            default : Date.now
        }
    },{
        timestamps : true
    }
);

export default model('Message',MessageSchema)