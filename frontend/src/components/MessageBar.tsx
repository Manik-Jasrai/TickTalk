
type MessageBarProps =  {
  input : string,
  setInput: React.Dispatch<React.SetStateAction<string>>
  sendMessage : any
}

const MessageBar = ({input , setInput , sendMessage} : MessageBarProps) => {

  return (
    <div className="flex pt-5 pb-3 px-4">
      <div className="flex bg-neutral-700 rounded-xl w-full h-12 px-4" >
        <form onSubmit={(e) => sendMessage(e)} className = "w-full flex">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="bg-neutral-700 rounded-xl h-full w-full" placeholder="Enter your message" />
          <button type="submit" className="bg-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 my-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default MessageBar