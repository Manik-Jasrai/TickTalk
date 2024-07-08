import { Request, Response } from "express";
import User from "../model/User";
import Chat from "../model/Chat";

export const updateProfile = async (req : Request , res : Response) => {

    const newProfile = req?.body?.profile;
    if (!newProfile) return res.status(400).json({'message' : 'Invalid Body'});

    const user = req.user;
    if (!user) return res.sendStatus(401);

    const validUser = await User.findOne({username : user.username}).exec();
    if (!validUser) return res.status(401).json({'message' : 'User not found'});

    validUser.profile = newProfile;
    await validUser.save();

    return res.sendStatus(200);
}

export const checkUser = async (req : Request , res : Response) => {
    const {username} = req?.params;    
    try {
        if (!username) return res.status(400).json({'message' : 'Invalid Body'});
        const user = await User.findOne({username : username}).exec();
        
        if (user) {
            const my = req.user?.username;
            const them = user.username;
            console.log(my,them);
            const sender = await User.findOne({username : my});
            const receiver = await User.findOne({username : them});
            const existingChat = await Chat.findOne({ 
                members: {
                    $all: [sender?._id, receiver?._id]
                }
            }).exec();
        
            if (existingChat) {
                return res.status(200).json({ result : false , message : 'Chat Already exists'});
            }
            return res.status(200).json({ result : true , message : 'User found'});
        }
        return res.status(200).json({ result : false , message : 'User not Found'});
    } catch(e) {
        return res.status(500).json({ result : false , message : 'User not Found'});
    }
}