import { useRecoilValue } from "recoil"
import { userState } from "../atoms/userState"
import findOtherValue from "../utils/findOtherValue";


const ContactItem = ({chat , setCurrChat} : any) => {


  const user = useRecoilValue(userState);
  const username = findOtherValue(chat.members , user.username as string);
  const lastMessage : string = chat.lastMessage.content;
  const time = new Date(chat.lastMessage.timeStamp);
  
  const timeStamp = time.toLocaleTimeString([],{ hour : "2-digit" , minute : "2-digit"});
  return (
    <div className = "grid grid-cols-5 border-b p-2" onClick={() => setCurrChat(chat)}>
        <img src = "/default.jpg" className="col-span-1 rounded-full"/>
        <div className="col-span-3 text-left pl-2 pt-1">
          <p className="text-md font-semibold">{username}</p>
          <p className="text-sm text-zinc-400">{lastMessage}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-400">{timeStamp}</span>
        </div>
    </div>
  )
}

export default ContactItem