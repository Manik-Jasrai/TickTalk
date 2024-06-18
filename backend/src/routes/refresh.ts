import express,{ Express } from "express";
import { handleRefresh } from "../controller/refreshController";

const refreshRouter : Express = express();

refreshRouter.post('/',handleRefresh);

export default refreshRouter