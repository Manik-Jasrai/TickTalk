import express,{ Express } from "express";

const app : Express = express();

const PORT = 3000;

app.get('/',(req,res) => {
    res.send("Hello");
});

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`);    
})