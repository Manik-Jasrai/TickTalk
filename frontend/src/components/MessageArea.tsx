import { useRecoilValue } from "recoil"
import MyMessage from "./MyMessage"
import OtherMessage from "./OtherMessage"
import { userState } from "../atoms/userState"
import { useEffect, useRef } from "react"

const MessageArea = ({messages} : {messages : any}) => {
  const user = useRecoilValue(userState);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior : 'smooth'});
  },[messages]);

  return (
    <div className="p-2 flex-1 overflow-auto">
        {
          messages?.map((message : any) => {
            if (message.sender == user.username) {
              return <MyMessage key = {messages.indexOf(message)} message= {message}  />
            }
            return <OtherMessage key = {messages.indexOf(message)} message = {message}/>
          })
        }        
        <div ref={messageEndRef}/>
    </div>
  )
}

export default MessageArea