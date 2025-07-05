import { Request, Response } from "express";
import User from "../model/User";
import jwt from "jsonwebtoken";

export const handleRefresh = async (req : Request,res : Response) => {
    const cookie = req.cookies;
    
    if(  !cookie?.jwt ) return res.sendStatus(401);//Unauthorised
    //cookie.jwt exists then
    const refreshToken = cookie.jwt;  

    const validUser = await User.findOne({ refreshToken }).exec();
    
    if( !validUser )  return res.sendStatus(401);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err : any,decoded : any) => {
            if( err || decoded.User.username !== validUser.username ) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    "User" : {
                        "username" : validUser.username
                    }
                },//payload
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn : '30m'}
            );

            res.json({user : validUser, accessToken });

        }
    )

};