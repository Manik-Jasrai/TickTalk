import { useEffect, useState } from "react"
import Chat from "../components/Chat"
import ContactList from "../components/ContactList"
import HomePage from "../components/HomePage"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/userState"

const ChatPage = () => {
  const [socket,setSocket] = useState<WebSocket | null >(null);
  const user = useRecoilValue(userState);
  const [currChat,setCurrChat] = useState<Object | null>(null);

  useEffect(() =>{
    const newSocket = new WebSocket(`ws://localhost:3000/?token=${user.token}`);

    newSocket.onopen = () => {
      console.log('Connection Established!!');
    }
    setSocket(newSocket);
    return () => {
      if (socket?.readyState == WebSocket.OPEN) {
        newSocket.close();
        console.log('Connection Closed!!');
        setSocket(null);
      }
    };
  },[]);

  return (
    <div className="flex h-screen w-full">
      <ContactList
        currChat={currChat}
        setCurrChat={setCurrChat}
      />

      {currChat ? 
        <Chat
          socket={socket}
          currChat={currChat}
          setCurrChat={setCurrChat}
        />
        : <HomePage />
      }
    </div>
  )
}

export default ChatPage