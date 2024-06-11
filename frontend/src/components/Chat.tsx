import ContactBar from "./ContactBar"
import MessageArea from "./MessageArea"
import MessageBar from "./MessageBar"

const Chat = () => {
  return (
    <div className='w-3/4 flex flex-col'>
      <ContactBar />
      <MessageArea />
      <MessageBar />

    </div>
  )
}

export default Chat