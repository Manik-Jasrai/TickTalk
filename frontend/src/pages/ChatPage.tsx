import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import axios from "../api/axios"
import { userState } from "../atoms/userState"
import Chat from "../components/Chat"
import ContactList from "../components/ContactList"
import HomePage from "../components/HomePage"
import NewUser from "../components/NewUser"

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
  const [addUserPage , setAddUserPage] = useState<boolean>(false);
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

          const chatExists = prevChats.some(chat => chat._id === data.chat._id);
          let updatedChats;
          if (chatExists) {
            updatedChats = prevChats.map(chat => {
              if (chat._id == data.chat._id) {
                return {...chat , ...data.chat}
              }
              return chat;
            });

            const updatedChat = updatedChats.find(chat => chat._id === data.chat._id);
            const filteredChats = updatedChats.filter(chat => chat._id !== data.chat._id);

            return [updatedChat , ...filteredChats];
            
          } else {
            updatedChats = [ data.chat,...prevChats];
          }

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

  useEffect(()=>{
    if(currChat) {
      setAddUserPage(false);
    }
  },[currChat])

  return (
    <div className="flex h-screen w-full">
      <ContactList
        setCurrChat={setCurrChat}
        chats = {chats}
        setAddUserPage = {setAddUserPage}
      />

      {currChat ? 
        <Chat
          socket={socket}
          currChat={currChat}
        />
        : addUserPage ? 
        <NewUser
          socket={socket}
        />
        :<HomePage />
      }
    </div>
  )
}

export default ChatPage