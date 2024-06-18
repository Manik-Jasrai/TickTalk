import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyJWT = (req : Request,res : Response,next : any) => {
    const authHeader  = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !(authHeader as string).startsWith('Bearer')) return res.sendStatus(401);
    const token = (authHeader as string).split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err,decoded) => {
            if (err) return res.sendStatus(401);
            const decodedPayload = decoded as JwtPayload;
            req.user = decodedPayload.User;              

            next();
        }

    );
};

export default verifyJWT