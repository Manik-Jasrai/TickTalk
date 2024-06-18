import express,{ Express } from "express";
import { getAllChats } from "../controller/chatController";

const chatRouter : Express = express();

chatRouter.get('/',getAllChats);

export default chatRouter