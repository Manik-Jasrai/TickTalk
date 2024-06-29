
const MyMessage = ({message} : any) => {

  const content = message.content;
  const time = new Date(message.timeStamp);
  const timeStamp = time.toLocaleTimeString([],{ hour : "2-digit" , minute : "2-digit"});
  return (
    <div className="flex justify-end my-1">
        <div className="rounded-md max-w-64 p-2 bg-blue-400">
            <p className="text-left">{content}</p>
            <p className="text-xs text-right">{timeStamp}</p>
        </div>
    </div>
  )
}

export default MyMessage