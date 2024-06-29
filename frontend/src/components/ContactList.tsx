import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState";
import axios from "../api/axios";
import ContactItem from "./ContactItem";
import ProfileElement from "./ProfileElement";
import SearchBar from "./SearchBar";

const ContactList = ({ currChat,setCurrChat } : any) => {
  const user = useRecoilValue(userState);
  const [chats , setChats] = useState<any[] | null>(null);

  const getAllChats = async () => {
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
  const sortChats = (chats : any[]) => {
    return chats.sort((a , b) => {
      return b.lastMessage.timeStamp - a.lastMessage.timeStamp
    })
  }

  useEffect(() => {
    getAllChats();
    setChats((prev) => {
      if (prev) {
        return sortChats(prev)
      }
      return null
    });
  },[]);  

  useEffect(() => {
    setChats((prevChats) => {
      if (!prevChats) return prevChats;
      const updatedChats = prevChats.map((chat) =>
        chat._id === currChat._id ? { ...chat, ...currChat } : chat
      );
      
      return sortChats(updatedChats);
    });
  }, [currChat]);
  
return (
  <div className = "w-1/4 bg-neutral-700 flex flex-col">
      <ProfileElement />
      <SearchBar />
      <div className="flex-1 overflow-auto border-t">
        {
          !chats? <p>Loading...</p> 
            :chats.map(chat => 
              <ContactItem 
                key={chats.indexOf(chat)}
                chat={chat}
                setCurrChat={setCurrChat}
              />
            )
        }
      </div>
    </div>
  )
}

export default ContactList