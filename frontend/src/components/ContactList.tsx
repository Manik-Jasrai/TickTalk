import ContactItem from "./ContactItem";
import ProfileElement from "./ProfileElement";
import SearchBar from "./SearchBar";

const ContactList = ({ setCurrChat,chats,setAddUserPage } : any) => { 

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

      <div>
        <p 
          className="my-4 text-blue-400 font-bold hover:underline"
          onClick={() => {
            setAddUserPage(true);
            setCurrChat(null);
          }}
        >
          Add Chat
        </p>
      </div>
    </div>
  )
}

export default ContactList