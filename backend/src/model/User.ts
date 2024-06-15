import { Schema, model } from "mongoose";

const UserSchema : Schema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        name : {
            type : String
        },
        status : {
            type : String,
            enum : ["online","offline"],
            default : "offline",
        },
        profile :{
            type : String,
            default : null
        },
        chats : [{
            type : Schema.Types.ObjectId,
            ref : 'Chat'
        }]
    }
);

export default model('User',UserSchema)