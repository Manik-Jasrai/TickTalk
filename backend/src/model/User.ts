import { Schema, model,Document,Types } from "mongoose";

export interface IUser extends Document {
    _id : Schema.Types.ObjectId;
    refreshToken ?: string;
    username: string;
    password: string;
    name?: string;
    status: "online" | "offline";
    profile?: string | null;
    chats: Schema.Types.ObjectId[];
}

const UserSchema : Schema<IUser> = new Schema(
    {
        refreshToken : String,
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

export default model<IUser>('User',UserSchema)