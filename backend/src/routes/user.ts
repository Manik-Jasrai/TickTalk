import express ,{ Express } from "express"
import { updateProfile } from "../controller/userController";

const userRouter : Express = express();
userRouter.post('/profile' , updateProfile);

export default userRouter