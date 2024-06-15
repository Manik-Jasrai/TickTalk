import express,{ Express } from "express";
import { handleNewUser } from "../controller/registerController";

const registerRouter : Express = express();

registerRouter.post('/',handleNewUser);

export default registerRouter