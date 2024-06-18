import { IncomingMessage } from "http";
import { WebSocket } from "ws";

export const WebSocketConnection = (ws : WebSocket,req : IncomingMessage) => {
    
    // Authenticate
    
    // On Message
    ws.on('message',()=>{
        // verify the message

        // send to database

        // send to reciever if online
    })
}