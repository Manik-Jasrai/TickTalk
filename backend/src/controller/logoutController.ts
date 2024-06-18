import { Request, Response } from "express";
import User from "../model/User";


export const handleLogout = async (req : Request,res : Response) => {
    const cookie = req.cookies;
    
    if( !cookie || !cookie.jwt ) return res.sendStatus( 204 ); //no content
    const refreshToken = cookie.jwt;
    const validUser = await User.findOne({ refreshToken }).exec();

    if( !validUser ) {
        //clear the cookie
        res.clearCookie('jwt',{ httpOnly:true});
        res.sendStatus( 204 );
        return;
    } 

    validUser.refreshToken = '';
    await validUser.save();
    res.clearCookie('jwt',{ httpOnly:true});
    res.sendStatus( 204 );
}