import express ,{ Express } from "express"
import { checkUser, updateProfile } from "../controller/userController";

const userRouter : Express = express();
userRouter.post('/profile' , updateProfile);
userRouter.get('/check/:username',checkUser);

export default userRouter