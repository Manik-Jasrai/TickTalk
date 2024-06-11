

const ProfileElement = () => {
  return (
    <div className="grid grid-cols-5 text-left p-4">
        <img src="/channel.jpg" className="col-span-1 rounded-full" />
        <p className = "col-span-3 pl-4 my-auto text-lg">Manik</p>
        <button className="col-span-1 text-xs h-7 my-auto p-0">Log Out</button>
    </div>
  )
}

export default ProfileElement