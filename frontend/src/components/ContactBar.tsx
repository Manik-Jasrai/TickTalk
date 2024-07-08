
const ContactBar = ({otherUser } : any) => {
  return (
    <div className="grid grid-cols-12 p-3 ">
        <img src = {`/${otherUser.profile}`} className="col-span-1 rounded-full size-16"/>
        <div className="col-span-4 text-left">
            <p className="text-xl font-semibold pt-3">{otherUser.username}</p>
        </div>
    </div>
  )
}

export default ContactBar