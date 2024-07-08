import { useEffect, useState } from "react"
import ContactBar from "./ContactBar"
import MessageArea from "./MessageArea"
import MessageBar from "./MessageBar"
import findOtherValue from "../utils/findOtherValue"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/userState"

const Chat = ({ socket , currChat} : {socket : WebSocket | null , currChat : any }) => {
  const user = useRecoilValue(userState);
  const username = findOtherValue(currChat.members , user.username as string);
  const [input , setInput] = useState<string>('');
  const [messages , setMessages] = useState<any[]>([]);

  const sendMessage = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || input.length <=0 ) return;
    const messageObject = {
      sender : user.username,
      receiver : username,
      content : input
    }
    socket?.send(JSON.stringify(messageObject));
    setInput('');
  };
  

  useEffect(()=>{
    setMessages(currChat.messages || []);
  },[currChat]);

  return (
    <div className='w-3/4 flex flex-col'>
      <ContactBar 
        username = {username}
      />
      <MessageArea 
        messages = {messages}
      />
      <MessageBar 
        input = {input}
        setInput = {setInput}
        sendMessage = {sendMessage}
      />

    </div>
  )
}

export default Chat