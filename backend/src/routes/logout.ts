import express,{ Express } from "express";

import { handleLogout } from "../controller/logoutController";

const logoutRouter : Express = express();

logoutRouter.get('/',handleLogout);

export default logoutRouter