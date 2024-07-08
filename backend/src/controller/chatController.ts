import { Request, Response } from "express";
import User from "../model/User";

export const getAllChats = async (req : Request,res : Response) => {
    // get all chats of logged in user
    const user = req.user;
    if (!user) return res.sendStatus(401);

    const validUser = await User.findOne({ username: user.username })
            .populate({
                path: "chats",
                populate: [
                    { path: "members" },
                    { path: "messages" },
                    { path: "lastMessage", select: "timeStamp" }
                ]
            })
            .exec();
    if (!validUser) return res.status(401).json({'message' : 'User not found'});   
    const chats = validUser.chats;
    res.json({'chats' : chats});
};