import express,{ Express } from "express";

import { handleLogin } from "../controller/loginController";

const loginRouter : Express = express();

loginRouter.post('/',handleLogin);

export default loginRouter