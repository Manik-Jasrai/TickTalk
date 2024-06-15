import User from "../model/User";
import bcrypt from "bcrypt";
import { Request,Response } from "express";

export const handleNewUser = async (req : Request,res : Response) => {
    //input of user
    const {username,password} = req.body;
    //checking of valid input
    if(!(username && password)) return res.status(400).json({'message':`User and password required`});
    //check for duplicacy
    const duplicate = await User.findOne( { username : username } ).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        //hash the pwd
        const hashedPwd = await bcrypt.hash(password,10);
        //enter back to the DB

        const result = await User.create({
            "username" : username,
            "password" : hashedPwd
        });
        res.status(201).json({'message' : `new user ${username} created`});
    }
    catch (err : any){
        res.status(500).json({'message':err.message});
    }
};


