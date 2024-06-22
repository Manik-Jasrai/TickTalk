import Chat from "../components/Chat"
import ContactList from "../components/ContactList"
import HomePage from "../components/HomePage"

const ChatPage = () => {
  return (
    <div className="flex h-screen w-full">
        <ContactList />
        <Chat />
        
    </div>
  )
}

export default ChatPage