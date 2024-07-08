import { useRecoilState } from "recoil"
import { userState } from "../atoms/userState"
import axios from "../api/axios";

const ProfileElement = () => {

  const [user,setUser] = useRecoilState(userState);

  const handleLogOut = async () => {
    await axios.get('/logout');
    setUser({username : null , token : null , profile : 'default.jpg'});
  }

  return (
    <div className="grid grid-cols-5 text-left p-4">
        <img src={'/' + user.profile} className="col-span-1 rounded-full" />
        <p className = "col-span-3 pl-4 my-auto text-lg">{user.username}</p>
        <button className="col-span-1 text-xs h-7 my-auto p-0" onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default ProfileElement