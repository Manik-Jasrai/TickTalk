import { Request, Response } from "express"

export const logger = (req : Request,res : Response,next : any) => {
    console.log(`${req.method} ${req.path}`)
    next();
}