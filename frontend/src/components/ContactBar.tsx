
const ContactBar = () => {
  return (
    <div className="grid grid-cols-12 p-3 ">
        <img src = "/channel.jpg" className="col-span-1 rounded-full size-16"/>
        <div className="col-span-4 text-left">
            <p className="text-xl font-semibold pt-3">Manik</p>
            <p className="text-xs text-zinc-400">offline</p>
        </div>
    </div>
  )
}

export default ContactBar