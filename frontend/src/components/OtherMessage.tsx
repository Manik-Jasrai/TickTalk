
const OtherMessage = ({message} : any) => {

  const content = message.content;
  const time = new Date(message.timeStamp);
  const timeStamp = time.toLocaleTimeString([],{ hour : "2-digit" , minute : "2-digit"});
  return (
    <div className="flex my-1">
        <div className="rounded-md bg-neutral-700 max-w-64 p-2">
            <p className="text-left">{content}</p>
            <p className="text-xs text-right">{timeStamp}</p>
        </div>
    </div>
  )
}

export default OtherMessage