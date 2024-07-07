import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userState";
import axios from "../api/axios";
import ContactItem from "./ContactItem";
import ProfileElement from "./ProfileElement";
import SearchBar from "./SearchBar";

const ContactList = ({ currChat,setCurrChat,chats,setChats } : any) => { 

return (
  <div className = "w-1/4 bg-neutral-700 flex flex-col">
      <ProfileElement />
      <SearchBar />
      <div className="flex-1 overflow-auto border-t">
        {
          !chats? <p>Loading...</p> 
            :chats.map((chat:any) => 
              <ContactItem 
                key={chat._id}
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