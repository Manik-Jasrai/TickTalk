

const ContactItem = () => {
  return (
    <div className = "grid grid-cols-5 border-b p-2">
        <img src = "/channel.jpg" className="col-span-1 rounded-full"/>
        <div className="col-span-3 text-left pl-2 pt-1">
            <p className="text-md font-semibold">Manik</p>
            <p className="text-sm text-zinc-400">Last message was .....</p>
        </div>
        <div className="text-right">
            <span className="text-xs text-zinc-400">12:01</span>
        </div>
    </div>
  )
}

export default ContactItem