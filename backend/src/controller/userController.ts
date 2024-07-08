import { Request, Response } from "express";
import User from "../model/User";

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