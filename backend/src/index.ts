import { configDotenv } from "dotenv";
configDotenv();
import express,{ Express,Request,Response } from "express";
import mongoose from "mongoose";
import connectDB from "./config/connectDB";
import cors from "cors"

//routes
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
//connecting to DB
connectDB();

const app : Express = express();
const PORT = 3000;

//to handle url encoded data
app.use(express.urlencoded({extended : false}));
//to handle JSON files
app.use(express.json());

app.use(cors());


app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.get('/',(req : Request,res : Response) => {
    res.send("Hello");
});

mongoose.connection.once('open',()=> {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})