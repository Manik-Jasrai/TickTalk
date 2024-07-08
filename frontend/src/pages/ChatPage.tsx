import { useEffect, useState } from "react"
import Chat from "../components/Chat"
import ContactList from "../components/ContactList"
import HomePage from "../components/HomePage"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/userState"
import axios from "../api/axios"

const getAllChats = async (user : any, setChats : any) => {
  try {
    const response = await axios.get('/chat',{
      headers : {
        Authorization : `Bearer ${user.token}`
      }
    })
    setChats(response.data.chats);
  } catch (err : any) {
    if (err.response.status == 401) {
      console.log("Unauthorized");
    }
  } 
}

const ChatPage = () => {
  const user = useRecoilValue(userState);
  const [socket,setSocket] = useState<WebSocket | null >(null);
  const [currChat,setCurrChat] = useState<any | null>(null);
  const [chats , setChats] = useState<any[] | null>(null);

  useEffect(() =>{
    try {
      getAllChats(user, setChats);
      const newSocket = new WebSocket(`ws://localhost:3000/?token=${user.token}`);
      newSocket.onopen = () => {
        console.log('Connection Established!!');
      }

      newSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        setChats((prevChats) => {
            if (!prevChats) return prevChats;

            const updatedChats = prevChats.map(chat => {
              if (chat._id == data.chat._id) {
                return {...chat , ...data.chat}
              }
              return chat;
            });
            return updatedChats;
        });
      };

      setSocket(newSocket);
      return () => {
        if (socket?.readyState == WebSocket.OPEN) {
          newSocket.close();
          console.log('Connection Closed!!');
          setSocket(null);
        }
      };
    } catch (err) {
      console.log(err);
    }
  },[]);

  useEffect(()=>{
    console.log(chats);
    if (currChat) {
      chats?.forEach(chat => {
        if (chat._id == currChat._id) {
          setCurrChat(chat);
        }
      })
    }
  },[chats])

  return (
    <div className="flex h-screen w-full">
      <ContactList
        currChat={currChat}
        setChats = {setChats}
      />

      {currChat ? 
        <Chat
          socket={socket}
          currChat={currChat}
        />
        : <HomePage />
      }
    </div>
  )
}

export default ChatPage