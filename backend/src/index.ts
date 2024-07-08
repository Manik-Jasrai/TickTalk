import { configDotenv } from "dotenv";
configDotenv();
import express,{ Express,Request,Response } from "express";
import http from "http";
import mongoose from "mongoose";
import connectDB from "./config/connectDB";
import cors from "cors"
import cookieParser from "cookie-parser";
import WebSocketFunction from "./websocket";
import { logger } from "./middleware/logger";

//types
declare global {
    interface JwtPayload {
        User: {
            username: string;
        };
    }
    namespace Express {
        interface Request {
            user ?: {
                username : string
            }
        }
    }
}

//routes
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import refreshRouter from "./routes/refresh";
import chatRouter from "./routes/chat";
import userRouter from "./routes/user";
//connecting to DB
connectDB();

const app : Express = express();
const server = http.createServer(app);
const PORT = 3000;

//middlewares
import verifyJWT from "./middleware/verifyJWT";
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

//Routes
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/refresh',refreshRouter);
app.use(verifyJWT);// Use to Authenticate our http endpoints

app.use('/chat',chatRouter);
app.use('/user',userRouter);
app.get('/helloworld',(req : Request,res : Response) => {
    res.send("Hello World");
});

WebSocketFunction(server);

mongoose.connection.once('open',()=> {
    console.log('Connected to mongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})