import { IncomingMessage, Server } from "http";
import jwt from "jsonwebtoken";
import { WebSocket,WebSocketServer } from "ws";
import onlineClients from "../data/onlineClients";
import { updateChat } from "./updateChat";

const WebSocketFunction = (expressServer : Server) => {
    const wss = new WebSocketServer({server : expressServer});

    wss.on('connection' , (ws : WebSocket,req : IncomingMessage) => {
        ws.on('error', console.error);

        // Authentication
        const token = new URLSearchParams((req?.url)?.split('?')[1]).get('token');
        if(!token) return ws.close(401);
        let username : string = '';
        jwt.verify(token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err,decoded) => {
                if (err) return ws.close(401);
                const decodedPayload = decoded as JwtPayload;
                username = decodedPayload.User.username;
            }
        )
        // Add the user to online clients
        onlineClients[username] = ws;

        // On Message
        ws.on('message',(message)=>{
            // verify the message
            const msgObject = JSON.parse(message.toString());
            
            // send to database            
            const newMessage = {
                sender : msgObject.sender,
                receiver : msgObject.receiver,
                content : msgObject.content
            };
            // Register to DB
            updateChat(newMessage);
            
            // send to reciever if online
            const onlineReceiver : WebSocket | undefined = onlineClients[newMessage.receiver];
            if (onlineReceiver && onlineReceiver.readyState == WebSocket.OPEN) {
                // send to receiver
                onlineReceiver.send(JSON.stringify(newMessage));
            }
        });

        ws.on('close' , () => {
            delete onlineClients[username];
        })
    })
};

export default WebSocketFunction