import User,{IUser} from "../model/User";
import bcrypt from "bcrypt";
import { Request,Response } from "express";
import jwt from "jsonwebtoken"
import { FilterQuery } from "mongoose";

export const handleLogin = async (req : Request,res : Response) => {
    const {username,password} = req.body;
    if(!(username && password)) return res.status(400).json({'message':`User and password required`});

    const validUser  = await User.findOne({ username : username }).exec();
    if (!validUser) return res.sendStatus(401);
    const validPass = await bcrypt.compare(password , validUser.password);

    if (validPass) {
        const accessToken = jwt.sign(
            {
                "User" : {
                    "username" : validUser.username
                }
            },//payload
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn : '30m'}
        );
        const refreshToken = jwt.sign(
            {
                "User" : {
                    "username" : validUser.username
                }
            },//payload
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn : '1d'}
        );
        await User.updateOne(validUser as FilterQuery<IUser>, {  refreshToken });
        
        res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge : 24 * 60 * 60 * 1000 });
        res.json( {accessToken , validUser } );
    } else {
        res.sendStatus(401);
    }
};
